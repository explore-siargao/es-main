import { ResponseService } from '@/common/service/response'
import { Request, Response } from 'express'
import { activities } from './jsons/activities'
import { UNKNOWN_ERROR_OCCURRED, USER_NOT_AUTHORIZED } from '@/common/constants'
import { T_AddItineraries } from '@repo/contract'

const response = new ResponseService()

export const addItineraries = async (req: Request, res: Response) => {
  const userId = res.locals.user?.id
  const isHost = res.locals.user?.isHost
  try {
    const activityId = Number(req.params.activityId)
    const newItinerary: T_AddItineraries = {
      ...req.body,
      activities: req.body.activities
        ? JSON.stringify(req.body.activities)
        : null,
    }

    const activitiesData = activities.find(
      (activity) => activity.id === activityId
    )
    console.log(activitiesData?.isBuilderEnabled)
    if (!isHost || !activities.some((item) => item.hostId === userId)) {
      return res.json(response.error({ message: USER_NOT_AUTHORIZED }))
    }

    if (activitiesData?.isBuilderEnabled) {
      //@ts-ignore
      activitiesData?.Itineraries.push(newItinerary)
    } else {
      //@ts-ignore
      activitiesData.Itineraries = null
    }
    return res.json(
      response.success({
        item: activitiesData?.Itineraries,
        message: 'New itinerary successfully added for the specific activity!',
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

export const getItineraries = async (req: Request, res: Response) => {
  const userId = res.locals.user?.id
  const isHost = res.locals.user?.isHost
  try {
    const activityId = Number(req.params.activityId)
    const activitiesData = activities.find(
      (activity) => activity.id === activityId
    )

    if (!isHost || !activities.some((item) => item.hostId === userId)) {
      return res.json(response.error({ message: USER_NOT_AUTHORIZED }))
    }

    if (!activitiesData) {
      return res.json(
        response.error({
          message: 'Activities with the given ID not found!',
        })
      )
    }

    const data = {
      id: activitiesData.id,
      meetingPointDescription: activitiesData.meetingPointDescription,
      latitude: activitiesData.latitude,
      longitude: activitiesData.longitude,
      address: activitiesData.Address,
      howToGetThere: activitiesData.howToGetThere,
      isBuilderEnbled: activitiesData.isBuilderEnabled,
      itineraries:
        activitiesData.Itineraries !== null
          ? activitiesData.Itineraries.map((item) => {
              return {
                ...item,
                activities: item.activities
                  ? JSON.parse(item.activities)
                  : null,
              }
            }).sort((l, h) => l.destinationNumber - h.destinationNumber)
          : null,
    }

    return res.json(
      response.success({
        item: data,
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

export const updateItinerary = async (req: Request, res: Response) => {
  const userId = res.locals.user?.id
  try {
    const activityId = Number(req.params.activityId)
    const updateData = req.body
    const activityIndex = activities.findIndex(
      (activity) => activity.id === activityId
    )

    if (!activities.some((item) => item.hostId === userId)) {
      return res.json(response.error({ message: USER_NOT_AUTHORIZED }))
    }

    if (activityIndex === -1) {
      return res.json(
        response.error({ message: 'Activity with the given ID not found!' })
      )
    }

    let itinerary = null
    activities[activityIndex] = { ...activities[activityIndex], ...updateData }
    const updateActivity = activities[activityIndex]

    if (updateData.isBuilderEnabled === true) {
      itinerary = updateActivity?.Itineraries
    } else {
      itinerary = null
    }
    if (updateActivity) {
      const updatedActivityData = {
        meetingPointDescription: updateActivity.meetingPointDescription,
        latitude: updateActivity.latitude,
        longitude: updateActivity.longitude,
        address: updateActivity.Address,
        howToGetThere: updateActivity.howToGetThere,
        isBuilderEnabled: updateActivity.isBuilderEnabled,
        itineraries: itinerary,
      }
      //@ts-ignore
      activities[activityIndex].meetingPointDescription =
        updatedActivityData.meetingPointDescription
      //@ts-ignore
      activities[activityIndex].latitude = updatedActivityData.latitude
      //@ts-ignore
      activities[activityIndex].longitude = updatedActivityData.longitude
      //@ts-ignore
      activities[activityIndex].Address = updatedActivityData.address
      //@ts-ignore
      activities[activityIndex].howToGetThere =
        updatedActivityData.howToGetThere
      //@ts-ignore
      activities[activityIndex].isBuilderEnabled =
        updatedActivityData.isBuilderEnabled
      //@ts-ignore
      activities[activityIndex].Itineraries = updatedActivityData.itineraries
      //@ts-ignore
      activities[activityIndex].finishedSections = '["basicInfo","itinerary"]'
      return res.json(
        response.success({
          item: updatedActivityData,
          message: 'Activity successfully updated!',
        })
      )
    } else {
      return res.json(
        response.error({
          message: 'Error updating activities!',
        })
      )
    }
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const deleteItinerary = async (req: Request, res: Response) => {
  const userId = res.locals.user?.id
  const isHost = res.locals.user?.isHost
  try {
    const itineraryId = Number(req.params.itineraryId)
    const activityId = Number(req.params.activityId)

    const activitiesData = activities.find(
      (activity) => activity.id === activityId
    )

    if (!isHost || !activities.some((item) => item.hostId === userId)) {
      return res.json(response.error({ message: USER_NOT_AUTHORIZED }))
    }

    if (!activitiesData) {
      return res.json(
        response.error({ message: 'Activity with the given ID not found!' })
      )
    }

    const itineraryIndex =
      activitiesData.Itineraries !== null
        ? activitiesData.Itineraries.findIndex(
            (itinerary) => itinerary.id === itineraryId
          )
        : -1

    if (itineraryIndex === -1) {
      return res.json(
        response.error({ message: 'Itinerary with the given ID not found!' })
      )
    }

    const deleteItinerary =
      activitiesData.Itineraries !== null &&
      activitiesData.Itineraries.splice(itineraryIndex, 1)

    return res.json(
      response.success({
        //@ts-ignore
        item: deleteItinerary[0] || null,
        message: 'Itinerary successfully deleted from the specific activity',
        allItemCount:
          activitiesData.Itineraries !== null
            ? activitiesData.Itineraries.length
            : 0,
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
