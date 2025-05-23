import {
    HStack,
    Skeleton,
    SkeletonCircle,
    SkeletonText,
    Stack,
  } from "@chakra-ui/react"
  
  export default function Loading() {
    return (
     <div className="w-full h-full flex px-8">
         <Stack align="center" className="w-full h-full flex justify-center items-center">
        <div className="w-full h-full flex justify-center  mt-32 gap-x-8">
        <Skeleton height="514px" width="100%" className="flex-1"/>
        <Skeleton height="600px" width="100%" className="flex-1"/>
        </div>
      </Stack>
     </div>
    )
  }