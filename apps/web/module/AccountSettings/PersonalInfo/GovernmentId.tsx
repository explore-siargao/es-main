import { Button } from "@/common/components/ui/Button"
import { Option, Select } from "@/common/components/ui/Select"
import { Typography } from "@/common/components/ui/Typography"
import { cn } from "@/common/helpers/cn"
import { IPersonalInfo } from "@/common/types/global"
import { LucideUndo2 } from "lucide-react"
import Image from "next/image"
import React, { useState } from "react"
import { FileWithPath, useDropzone } from "react-dropzone"
import toast from "react-hot-toast"
import useAddGovernmentId from "../hooks/useAddGovernmentId"
import useSessionStore from "@/common/store/useSessionStore"
import { E_GovernmentId } from "@repo/contract/build/GovernmentId/enum"
import { T_BackendResponse, T_GovernmentId } from "@repo/contract"
import GovernmentIdModal from "../components/modals/GovernmentIdModal"
import { governmentIdMap } from "@/common/helpers/governmentIdMap"
import { useQueryClient } from "@tanstack/react-query"

type PersonalInfoProps = {
  isButtonClicked: boolean
  contentId: string
}

type GovernmentIdItem = {
  type: string
  fileKey: string
}

const ID_TYPES = [
  { name: "Driver's License", value: E_GovernmentId.DriversLicense },
  { name: "Passport", value: E_GovernmentId.Passport },
  { name: "National ID", value: E_GovernmentId.NationalID },
  { name: "Postal ID", value: E_GovernmentId.PostalID },
]

const GovernmentId = ({ governmentId }: IPersonalInfo) => {
  const queryClient = useQueryClient()
  const session = useSessionStore((state) => state)
  const [idType, setIdType] = useState<E_GovernmentId | null>(null)
  const [contentState, setContentState] = useState<PersonalInfoProps>({
    isButtonClicked: false,
    contentId: "",
  })
  const [file, setFile] = useState<(FileWithPath & { preview: string }) | null>(
    null
  )
  const [isModalOpen, setModalOpen] = useState(false)
  const [selectedGovernmentId, setSelectedGovernmentId] =
    useState<T_GovernmentId | null>(null)
  const { mutate, isPending } = useAddGovernmentId(session.id as number)
  const { getRootProps, getInputProps, isFocused } = useDropzone({
    multiple: false,
    accept: {
      "image/jpeg": [],
      "image/jpg": [],
      "image/png": [],
    },
    onDrop: (acceptedFiles: FileWithPath[]) => {
      setFile(
        // @ts-ignore
        Object.assign(acceptedFiles[0], {
          // @ts-ignore
          preview: URL.createObjectURL(acceptedFiles[0]),
        })
      )
    },
    onDropRejected: () => {
      toast.error("Only images and videos are allowed")
    },
    disabled: isPending,
  })
  const saveUpload = () => {
    if (!idType || !file) {
      toast.error("Please add the Identification Type and an image")
    } else {
      const callBackReq = {
        onSuccess: (data: T_BackendResponse) => {
          if (!data.error) {
            setIdType(null)
            setFile(null)
            toast.success("Successfully uploaded Government ID")
            queryClient.invalidateQueries({
              queryKey: ["session"],
            })
          } else {
            toast.error(String(data.message))
          }
        },
        onError: (err: any) => {
          toast.error(String(err))
        },
      }
      mutate({ type: idType, file }, callBackReq)
    }
  }

  const openGovernmentIdModal = (item: T_GovernmentId) => {
    setSelectedGovernmentId(item)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  const GovernmentIdList: GovernmentIdItem[] = [
    { type: "Passport", fileKey: "1.jpg" },
    { type: "Driver's License", fileKey: "2.jpg" },
    { type: "National ID", fileKey: "3.jpg" },
    { type: "Postal ID", fileKey: "4.jpg" },
  ]

  return (
    <div className="text-sm">
      {!contentState.isButtonClicked ? (
        <div className="flex justify-between py-5">
          <div>
            <Typography variant={"p"}>Government ID</Typography>
            <Typography fontWeight={"light"}>
              {governmentId
                ? `${governmentId.length} ID${governmentId.length > 1 ? "s" : ""} provided`
                : "Not Provided"}
            </Typography>
          </div>
          <button
            onClick={() =>
              setContentState({
                isButtonClicked: !contentState.isButtonClicked,
                contentId: "GovernmentId",
              })
            }
            className="underline self-start select-none"
          >
            Edit
          </button>
        </div>
      ) : (
        <div className="grid py-5">
          <div className="flex justify-between">
            <Typography variant={"p"}>Government ID</Typography>
            <button
              className="underline self-start select-none"
              onClick={() =>
                setContentState({
                  isButtonClicked: !contentState.isButtonClicked,
                  contentId: " ",
                })
              }
            >
              Cancel
            </button>
          </div>
          <Typography fontWeight={"light"}>
            We’ll need you to add an official government ID. This step helps
            make sure you’re really you.
          </Typography>
          <div className="grid md:grid-cols-2">
            <div className="w-full my-4">
              <h3 className="text-xl font-semibold">Your IDs</h3>
              <div className="mt-4">
                {governmentId?.map((id, index) => (
                  <p className="text-lg" key={id.type}>
                    {index + 1}. {governmentIdMap[id.type]}{" "}
                    <span
                      onClick={() => openGovernmentIdModal(id)}
                      className="text-primary-500 underline cursor-pointer hover:text-primary-700"
                      onKeyDown={() => {}}
                    >
                      View File
                    </span>
                  </p>
                ))}
              </div>
            </div>
            <div className="w-full my-4">
              <h3 className="text-xl font-semibold">Upload your ID here</h3>
              <div className="mt-4">
                <Select
                  label="Identification Type"
                  onChange={(e) => setIdType(e.target.value as E_GovernmentId)}
                  value={idType ? idType : ""}
                  disabled={isPending}
                  required
                >
                  <Option value={""}>Select</Option>
                  {ID_TYPES.map((idType) => {
                    return (
                      <Option key={idType.name} value={idType.value}>
                        {idType.name}
                      </Option>
                    )
                  })}
                </Select>
              </div>
              {file ? (
                <div className="flex justify-center my-6 bg-primary-50 rounded-xl border border-primary-200">
                  <div className="relative h-96">
                    <Image
                      src={file?.preview ?? "/assets/1.jpg"}
                      alt={`preview-${idType}`}
                      width={300}
                      height={300}
                      className="object-cover h-full w-full rounded-xl"
                    />
                  </div>
                </div>
              ) : (
                <label
                  {...getRootProps()}
                  htmlFor="dropzone-file"
                  className={cn(
                    isPending && "opacity-50",
                    isFocused && "opacity-80",
                    "flex flex-col items-center justify-center w-full h-64 border-2 border-primary-300 border-dashed rounded-xl cursor-pointer bg-primary-50 hover:bg-primary-100 mt-4"
                  )}
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-primary-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <Typography className="mb-2 text-text-500 d">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </Typography>
                    <Typography className="text-xs text-text-500">
                      PNG, JPG or GIF (MAX. 800x400px)
                    </Typography>
                  </div>
                  <input {...getInputProps()} />
                </label>
              )}
              {file && (
                <div className="flex justify-between items-center">
                  <button
                    className="flex items-center gap-1 mt-1 group hover:text-text-600"
                    onClick={() => setFile(null)}
                  >
                    <LucideUndo2 className="h-4 w-4 text-text-700 group-hover:text-text-600" />
                    Undo Image
                  </button>
                  <Button onClick={() => saveUpload()}>Upload and Save</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <GovernmentIdModal
        isOpen={isModalOpen}
        governmentId={selectedGovernmentId as T_GovernmentId}
        onClose={closeModal}
      />
    </div>
  )
}

export default GovernmentId
