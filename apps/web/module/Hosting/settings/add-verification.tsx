"use client"

import type React from "react"
import { Button } from "@/common/components/ui/Button"
import { Input } from "@/common/components/ui/Input"
import { Typography } from "@/common/components/ui/Typography"
import { cn } from "@/common/helpers/cn"
import { type FileWithPath, useDropzone } from "react-dropzone"
import toast from "react-hot-toast"
import Image from "@/common/components/ui/image"
import { SubmitHandler, useForm } from "react-hook-form"
import { T_Add_Host_Approval } from "@repo/contract-2/host-approval"
import useAddHostApproval from "./hooks/use-add-host-approval"
import { useState } from "react"
import { LucideUndo2 } from "lucide-react"

const AddVerification = () => {
  const { register, handleSubmit } = useForm<T_Add_Host_Approval>()
 const { mutate, isPending } = useAddHostApproval()
   
 const [file, setFile] = useState<(FileWithPath & { preview: string }) | null>(
    null
  )

  const onSubmit: SubmitHandler<T_Add_Host_Approval> = (formData) => {
    if (!file) {
      toast.error("Please add the Identification Type and an image");
      return;
    }
  
    const updatedFormData = {
      ...formData,
      file, 
    };
    const callBackReq = {
      onSuccess: (data: any) => {
        if (!data.error) {
          toast.success(data.message);
        } else {
          toast.error(String(data.message));
        }
      },
      onError: (err: any) => {
        toast.error(String(err));
      },
    };
  
    mutate(updatedFormData, callBackReq);
  };
  

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

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow mt-20 px-4 sm:px-6 lg:px-8">
        <Typography variant="h1" fontWeight="semibold" className="flex justify-between items-center mb-4">
          Add verification
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className="py-4 max-w-2xl space-y-4">
          <Input label="Business Type *"  {...register("businessType", { required: true })} />
          <Input label="Company Name *"  {...register("companyName", { required: true })}/>
          <Input label="BRN *"  {...register("brn", { required: true })}/>
          <Input label="Registered Address *"  {...register("registeredAddress", { required: true })}/>
            <div className="w-full my-4">
              <h3 className="text-xl font-semibold">Upload photocopy of business permit *</h3>
              <div className="mt-4">
              {file ? (
                <div className="flex justify-center my-6 bg-primary-50 rounded-xl border border-primary-200">
                  <div className="relative h-96">
                    <Image
                      src={file?.preview ?? "/assets/1.jpg"}
                      alt={`preview`}
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
                </div>
              )}
            </div>
          </div>
        <div className="mt-auto p-4 sm:p-6 lg:p-8">
      
      </div>
      <Button type="submit" variant="primary">
          Submit
        </Button>
        </form>
      </div>
      
      <div className="p-5">
     
        </div>
    </div>
  )
}

export default AddVerification

