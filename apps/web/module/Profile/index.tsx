"use client"
import { WidthWrapper } from "@/common/components/WidthWrapper"
import ProfileCard from "./components/ProfileCard"
import ConfirmedInformation from "./components/ConfirmedInformation"
import { FlagIcon } from "@heroicons/react/24/outline"
import AboutHost from "./components/AboutHost"
import HostReviews from "./components/HostReviews"
import HostListings from "./components/HostListings"
import HostGuideBooks from "./components/HostGuideBooks"
import { useState } from "react"
import ReportHostModal from "./components/modals/ReportHostModal"
import { Button } from "@/common/components/ui/Button"
import { LucideFlag } from "lucide-react"

const HostProfile = ({ profile }: { profile: any }) => {
  const [openReportModal, setOpenReportModal] = useState(false)
  return (
    <WidthWrapper width="small" className="my-24 lg:my-32">
      <div className="mt-5 mx-3 md:mx-40 lg:mx-5 grid lg:grid-cols-12 gap-x-20 gap-y-4">
        <div className=" lg:col-span-4 lg:relative">
          <div className="lg:sticky lg:top-40">
            <div className="mt-5">
              <ProfileCard
                name={profile?.userName}
                profileImage={profile?.imageKey}
                hostStatus={profile?.role}
                reviewsCount={profile?.countReviews}
                rating={profile?.ratings}
                hostingMonthAge={profile?.hostedSince}
              />
            </div>
            <div className="mt-8 hidden lg:block">
              <ConfirmedInformation
                name={profile?.userName}
                confirmedInformation={profile?.confirmInfo}
              />
            </div>
            <div className="mt-2">
              <Button
                variant="ghost"
                className="underline flex gap-1 items-center text-text-400 hover:text-text-600"
                size="sm"
                onClick={() => setOpenReportModal(true)}
              >
                <LucideFlag className="h-4 w-4" />
                Report this profile
              </Button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-8 space-y-10 mt-5">
          <AboutHost {...profile} />
          <hr />
          <HostReviews
            name={profile?.userName}
            reviewsCount={profile?.countReviews}
            // @ts-ignore
            reviews={profile?.listingWithReviews}
          />
          <hr />
          <div className="lg:hidden">
            <ConfirmedInformation
              name={profile?.userName}
              confirmedInformation={profile?.confirmInfo}
            />
            <hr className="mt-10" />
          </div>
          <HostListings
            name={profile?.userName}
            // @ts-ignore
            listings={profile?.listingWithReviews}
          />
          <hr />
          <HostGuideBooks name={profile?.userName} />
          <hr className="lg:hidden" />
          <div className="items-center flex lg:hidden">
            <FlagIcon className="h-5 w-5 mr-3" />
            <button
              className="underline font-semibold"
              onClick={() => setOpenReportModal(true)}
            >
              Report this profile
            </button>
          </div>
        </div>
      </div>
      <ReportHostModal
        isOpen={openReportModal}
        onClose={() => setOpenReportModal(false)}
      />
    </WidthWrapper>
  )
}

export default HostProfile
