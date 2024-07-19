// import ModalContainer from "@/common/components/ModalContainer"
// import { Typography } from "@/common/components/ui/Typography"
// import React from "react"
// import IconTitleDescription from "../IconTitleDescription"
// import { T_Property_Policy } from "@repo/contract"

// interface IHouseRules {
//   id: number
//   title: string
//   iconDesc: {
//     id: number
//     icon: string
//     rule: string
//     otherDescription?: string
//   }[]
// }

// interface HouseRulesModalProps {
//   isOpen: boolean
//   onClose: () => void
//   groupRules: T_Property_Policy[]
// }

// const HouseRulesModal = ({
//   isOpen,
//   onClose,
//   groupRules,
// }: HouseRulesModalProps) => {
//   return (
//     <ModalContainer onClose={onClose} isOpen={isOpen} size="sm">
//       <div className="py-5 px-8 flex flex-col divide-text-100 overflow-y-auto h-[600px]">
//         <Typography variant="h2" fontWeight="semibold" className="flex">
//           House rules
//         </Typography>
//         <Typography variant="h5" className="mb-5">
//           You'll be staying in someone's home so treat it like a home.
//         </Typography>
//         {groupRules.map((gRule: T_Property_Policy) => (
//           <div key={gRule._id}>
//             <Typography
//               variant="h4"
//               fontWeight="semibold"
//               className="mb-5 mt-5"
//             >
              
//               {gRule.category}
//             </Typography>
          
//             {gRule?.policy?.map((item) => (
//               <div key={item.id}>
//                 <div className="border-b mb-5 mt-5"></div>
//                 <IconTitleDescription
//                   title={item.rule}
//                   icon={item.icon}
//                   description={item.otherDescription}
//                 />
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     </ModalContainer>
//   )
// }

// export default HouseRulesModal
