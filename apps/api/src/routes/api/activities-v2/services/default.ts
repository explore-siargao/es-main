import { Request, Response } from 'express'
import { ResponseService } from '@/common/service/response'
import { UNKNOWN_ERROR_OCCURRED, USER_NOT_AUTHORIZED } from '@/common/constants'
import { dbActivities, dbLocations } from '@repo/database'

const response = new ResponseService()
export const addActivity = async (req: Request, res: Response) => {
  const userId = res.locals.user?.id

  try {
    const value = {
      host: userId,
      title: '',
      meetingPointDescription: '',
      description: '',
      highLights: [],
      durationHour: null,
      durationMinute: null,
      language: [],
      isFoodIncluded: false,
      isNonAlcoholicDrinkIncluded: false,
      isAlcoholicDrinkIncluded: false,
      otherInclusion: [],
      notIncluded: [],
      whatToBrings: [],
      cancellationDays: 0,
      notAllowed: [],
      activityPolicies: [],
      cancellationPolicies: [],
      activityPhotos: [],
    }

    const newActivity = new dbActivities(value)
    await newActivity.save()

    res.json(
      response.success({
        item: newActivity,
        message: 'Activity successfully added',
      })
    )
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const getActivity = async (req: Request, res: Response) => {
  const activityId = req.params.activityId
  try {
    const getActivity = await dbActivities
      .findOne({ _id: activityId, deletedAt: null })
      .populate('host')
      .populate('meetingPoint')
      .populate('segments')
      .populate('photos')
    res.json(response.success({ item: getActivity }))
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const getAllActivitiesByHostId = async (req: Request, res: Response) => {
  const hostId = res.locals.user?.id
  const isHost = res.locals.user?.isHost
  if (!isHost) {
    return res.json(
      response.error({
        message: USER_NOT_AUTHORIZED,
      })
    )
  }
  try {
    const filteredActivities = await dbActivities
      .find({ host: hostId })
      .populate('host', 'email isHost')
      .populate({ path: 'photos', options: { limit: 1, skip: 0 } })
      .select('title description status')
    res.json(
      response.success({
        items: filteredActivities,
      })
    )
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const updateItineraries = async (req: Request, res: Response) => {
  const activityId = req.params.activityId
  const isHost = res.locals.user?.isHost

  if (!isHost) {
    return res.json(
      response.error({
        message: 'User is not authorized to perform this action.',
      })
    )
  }

  try {
    const activity = await dbActivities.findById(activityId)

    if (!activity) {
      return res.json(
        response.error({
          message: 'Activity with the given ID not found!',
        })
      )
    }

    const { meetingPoint, isSegmentBuilderEnabled, segments } = req.body

    let addMeetingPoint
    if (activity.meetingPoint === undefined) {
      addMeetingPoint = new dbLocations(meetingPoint)
      await addMeetingPoint.save()
    }

    const updateMeetingPoint = await dbLocations.findByIdAndUpdate(
      activity.meetingPoint,
      {
        $set: {
          street: meetingPoint.street,
          barangay: meetingPoint.barangay,
          city: meetingPoint.city,
          howToGetThere: meetingPoint.howToGetThere,
          longitude: meetingPoint.longitude,
          latitude: meetingPoint.latitude,
          updatedAt: Date.now(),
        },
      },
      { new: true }
    )

    let updateSegment
    if (isSegmentBuilderEnabled) {
      updateSegment = await dbActivities.findByIdAndUpdate(
        activityId,
        {
          $set: {
            meetingPoint: updateMeetingPoint?._id || addMeetingPoint?._id,
            segments: segments,
            isSegmentBuilderEnabled: isSegmentBuilderEnabled,
            finishedSections: ['basicInfo', 'itinerary'],
            updatedAt: Date.now(),
          },
        },
        { new: true }
      )
    } else {
      updateSegment = await dbActivities.findByIdAndUpdate(
        activityId,
        {
          $set: {
            meetingPoint: updateMeetingPoint?._id,
            segments: [],
            isSegmentBuilderEnabled: isSegmentBuilderEnabled,
            updatedAt: Date.now(),
          },
        },
        { new: true }
      )
    }

    res.json(
      response.success({
        item: updateSegment,
        message: 'Activity successfully updated with new itinerary!',
      })
    )
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : 'An unknown error occurred.',
      })
    )
  }
}
