import { REQUIRED_VALUE_EMPTY } from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { T_BookableUnitType, T_UnitPrice } from '@repo/contract'
import { dbBookableUnitTypes, dbProperties, dbUnitPrices } from '@repo/database'
import { Request, Response } from 'express'

const response = new ResponseService()


export const updateUnitPrice = async (req: Request, res: Response) => {
  const userId = res.locals.user?.id;
  const propertyId = req.params.propertyId;
  const unitPrice: T_UnitPrice = req.body.unitPrice;

  // Find the property and populate bookableUnits with unitPrices
  const getProperty = await dbProperties
    .findOne({ _id: propertyId, offerBy: userId, deletedAt: null })
    .populate({
      path: 'bookableUnits',
      populate: {
        path: 'unitPrice',
        model: 'UnitPrices',
      },
    });

  // Check if the property exists
  if (!getProperty) {
    return res.json(response.error({ message: 'This property does not exist' }));
  }

  // Check if unitPrice is provided
  if (!unitPrice) {
    return res.json(response.error({ message: REQUIRED_VALUE_EMPTY + ' or invalid data format' }));
  }

  // Handle updating existing unitPrice if _id is provided
  if (unitPrice._id) {
    await dbUnitPrices.findByIdAndUpdate(
      unitPrice._id,
      {
        $set: {
          baseRate: unitPrice.baseRate,
          baseRateMaxCapacity: unitPrice.baseRateMaxCapacity,
          maximumCapacity: unitPrice.maximumCapacity,
          pricePerAdditionalPerson: unitPrice.pricePerAdditionalPerson,
          discountedWeeklyRate: unitPrice.discountedWeekLyRate,
          updatedAt: Date.now(),
        },
      },
      { new: true }
    );
  } else {
    // Handle creating a new unitPrice
    const newUnitPrice = new dbUnitPrices({
      baseRate: unitPrice.baseRate,
      baseRateMaxCapacity: unitPrice.baseRateMaxCapacity,
      maximumCapacity: unitPrice.maximumCapacity,
      pricePerAdditionalPerson: unitPrice.pricePerAdditionalPerson,
      discountedWeeklyRate: unitPrice.discountedWeekLyRate,
      createdAt: Date.now(),
      updatedAt: null,
      deletedAt: null,
    });

    await newUnitPrice.save();

    // Update the bookableUnit with the new unitPrice
    if (getProperty.bookableUnits.length > 0) {
      await Promise.all(
        getProperty.bookableUnits.map(async (unit) => {
          await dbBookableUnitTypes.findByIdAndUpdate(
            unit._id,
            {
              $set: {
                unitPrice: newUnitPrice._id,
                updatedAt: Date.now(),
              },
            },
            { new: true }
          );
        })
      );
    }
  }

  res.json(
    response.success({
      item: unitPrice,
      message: 'Unit Price successfully updated',
    })
  );
};




export const getUnitPrice = async (req: Request, res: Response) => {
  const propertyId = req.params.propertyId;
  const getProperty = await dbProperties
    .findOne({ _id: propertyId, deletedAt: null })
    .populate({
      path: 'bookableUnits',
      populate: {
        path: 'unitPrice',
        model: 'UnitPrices',
      },
    });

  if (!getProperty) {
    return res.json(response.error({ message: 'This property does not exist' }));
  }

  const bookableUnits = getProperty.bookableUnits;

  if (bookableUnits.length === 0) {
    return res.json(
      response.error({
        message: 'Bookable unit not found for this property',
      })
    );
  }

  const units = bookableUnits.map((item: T_BookableUnitType) => {
    const unitPrice = item.unitPrice;

    return {
      _id: item?._id,
      unitName: item?.title,
      unitPrice: {
        _id: unitPrice?._id,
        baseRate: unitPrice?.baseRate ?? 0,
        baseRateMaxCapacity: unitPrice?.baseRateMaxCapacity ?? 1, 
        maximumCapacity: unitPrice?.maximumCapacity ?? 1,
        pricePerAdditionalPerson: unitPrice?.pricePerAdditionalPerson ?? 0.0,
        discountedMonthlyRate: unitPrice?.discountMonthlyRate ?? 0, 
        discountedWeekLyRate: unitPrice?.discountedWeekLyRate ?? 0,
      },
    };
  });

  res.json(response.success({ items: units, allItemCount: units.length }));
};


