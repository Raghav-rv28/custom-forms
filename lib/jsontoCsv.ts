import { format, isDate } from "date-fns"

export default function convertToCSV(arr:any) {
    const array = [Object.keys(arr[0])].concat(arr)
  
    return array.map((val: any) => {
        if (val.submittedAt && val.submittedAt instanceof Date) { 
            return format(new Date(val?.submittedAt),"MM/dd/yyyy")
        }
      return Object.values(val).toString()
        
    }).join('\n')
  }
  