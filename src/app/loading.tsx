import {
    Skeleton,
    Stack,
  } from "@chakra-ui/react"
  
  export default function Loading() {
    return (
     <div className="w-full h-full flex px-8">
         <Stack align="center" className="w-full h-full flex justify-center items-center">
        <div className="w-full h-full flex justify-center  mt-32 ">
        <Skeleton height="514px" width="100%" />
        </div>
      </Stack>
     </div>
    )
  }