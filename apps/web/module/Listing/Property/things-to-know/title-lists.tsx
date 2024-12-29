import React, { useState } from "react"
import { Typography } from "@/common/components/ui/Typography"
import PoliciesModal from "./policies-modal" // Adjust the import path as needed
import { T_Property_Policy } from "@repo/contract"

interface TitleListsProps {
  title: string
  policies?: T_Property_Policy[]
  rules?: { id: number; rule: string }[]
  maxVisibleItems?: number
}

const TitleLists: React.FC<TitleListsProps> = ({
  title,
  policies,
  rules,
  maxVisibleItems = 3,
}) => {
  const [showModal, setShowModal] = useState(false)
  const [modalItems, setModalItems] = useState<{ id: number; text: string }[]>(
    []
  )
  const [modalCategory, setModalCategory] = useState<string>("")

  const visiblePolicies = policies?.slice(0, maxVisibleItems)

  const handleShowMore = (
    category: string,
    items: { id: number; text: string }[]
  ) => {
    setModalCategory(category)
    setModalItems(items)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setModalCategory("")
    setModalItems([])
  }

  return (
    <div>
      <Typography variant="h4" fontWeight="semibold">
        {title}
      </Typography>
      {visiblePolicies && (
        <ul>
          {visiblePolicies.map((policy) => (
            <li className="mt-2" key={policy._id}>
              <Typography>{policy.policy}</Typography>
            </li>
          ))}
        </ul>
      )}
      {rules && !policies && (
        <ul>
          {rules.map((rule) => (
            <li className="mt-2" key={rule.id}>
              <Typography>{rule.rule}</Typography>
            </li>
          ))}
        </ul>
      )}
      {policies && policies.length > maxVisibleItems && (
        <button
          className="underline mt-2"
          onClick={() =>
            handleShowMore(
              policies[0]?.category || "Policies",
              policies.map((policy) => ({
                id: policy._id ? parseInt(policy._id, 10) : 0,
                text: policy.policy,
              }))
            )
          }
        >
          Show more &gt;
        </button>
      )}

      <PoliciesModal
        isOpen={showModal}
        onClose={handleCloseModal}
        category={modalCategory}
        items={modalItems}
      />
    </div>
  )
}

export default TitleLists
