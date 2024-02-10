"use client";
import { DeleteFormSubmissionData } from "@/actions/form";
import { Cross1Icon } from "@radix-ui/react-icons";


export default function DeleteFormSubmissionButton({ id,submissionId }: { id: number, submissionId: number }){
    return <><Cross1Icon className="w-6 h-6 text-red-300 hover:text-red-600 hover:scale-105" onClick={()=>DeleteFormSubmissionData(id, submissionId )} /></>;
}