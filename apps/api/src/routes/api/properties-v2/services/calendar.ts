import { UNKNOWN_ERROR_OCCURRED } from "@/common/constants";
import { ResponseService } from "@/common/service/response";
import { dbProperties } from "@repo/database";
import { Request, Response } from "express";
import mongoose from "mongoose";

const response = new ResponseService();

export const getPropertyCalendarData = async (req: Request, res: Response) => {
    const propertyId = new mongoose.Types.ObjectId(req.params.propertyId);
    const category = String(req.params.category);
    const fromDate = new Date(req.params.fromDate as string);
    const toDate = new Date(req.params.toDate as string);

    try {
        const pipeline = [
            {
                $match: {
                    _id: propertyId,
                },
            },
            {
                $lookup: {
                    from: "bookableunittypes",
                    localField: "bookableUnits",
                    foreignField: "_id",
                    as: "bookableUnits",
                },
            },
            {
                $unwind: "$bookableUnits",
            },
            {
                $replaceRoot: { newRoot: "$bookableUnits" },
            },
            {
                $match: {
                    category: category,
                },
            },
            {
                $lookup: {
                    from: "unitprices",
                    localField: "unitPrice",
                    foreignField: "_id",
                    as: "unitPrice",
                },
            },
            {
                $addFields: {
                    name: "$title",
                    price: { $ifNull: [{ $arrayElemAt: ["$unitPrice.baseRate", 0] }, 0] },
                    [`${category.toLowerCase()}s`]: {
                        $map: {
                            input: { $range: [0, "$qty"] },
                            as: "index",
                            in: {
                                abbr: { $concat: ["$title", " ", { $toString: { $add: ["$$index", 1] } }] },
                                status: "available",
                                reservations: [],
                            },
                        },
                    },
                },
            },
            {
                $lookup: {
                    from: "reservations",
                    let: { unitId: "$_id", fromDate: fromDate, toDate: toDate },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$unitId", "$$unitId"] },
                                        {
                                            $or: [
                                                { $and: [{ $gte: ["$startDate", "$$fromDate"] }, { $lt: ["$startDate", "$$toDate"] }] },
                                                { $and: [{ $gte: ["$endDate", "$$fromDate"] }, { $lt: ["$endDate", "$$toDate"] }] },
                                            ],
                                        },
                                    ],
                                },
                            },
                        },
                        {
                            $lookup: {
                                from: "guests",
                                localField: "guest",
                                foreignField: "_id",
                                as: "guest",
                            },
                        },
                        {
                            $unwind: "$guest",
                        },
                        {
                            $project: {
                                unitId:1,
                                name: {$concat:["$guest.firstName"," ","$guest.lastName"]},
                                startDate: 1,
                                endDate: 1,
                                guestCount: 1,
                            },
                        },
                       
                    ],
                    as: "reservations",
                },
                
            },
            
            {
                $addFields: {
                    [`${category.toLowerCase()}s`]: {
                        $map: {
                            input: { $range: [0, { $size: `$${category.toLowerCase()}s` }] },
                            as: "index",
                            in: {
                                $cond: {
                                    if: { $eq: ["$$index", 0] }, // Apply this condition if index is 0
                                    then: {
                                        $mergeObjects: [
                                            { $arrayElemAt: [`$${category.toLowerCase()}s`, "$$index"] },
                                            {
                                                status: {
                                                    $cond: {
                                                        if: { $gt: [{ $size: "$reservations" }, 0] },
                                                        then: "occupied",
                                                        else: "available"
                                                    }
                                                },
                                            },
                                            {
                                                reservations: {
                                                    $filter: {
                                                        input: "$reservations",
                                                        as: "reservation",
                                                        cond: { $eq: ["$$reservation.unitId", "$_id"] },
                                                    },
                                                },
                                            },
                                        ],
                                    },
                                    else: { $arrayElemAt: [`$${category.toLowerCase()}s`, "$$index"] },
                                },
                            },
                        },
                    },
                },
            },
            {
                $project: {
                    name: 1,
                    price: 1,
                    [`${category.toLowerCase()}s`]: 1,
                },
            },
        ];

        const result = await dbProperties.aggregate(pipeline);
        return res.json(response.success({ items: result }));
    } catch (err: any) {
        console.error(err);
        return res.json(response.error({ message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED }));
    }
};
