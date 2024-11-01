"use client"
import React, { useState } from "react"
import { Button } from "@/common/components/ui/Button"
import { LINK_SEARCH_ACTIVITIES, LINK_SEARCH_PROPERTY, LINK_SEARCH_RENTAL } from "@/common/constants"
import Link from "next/link"
import { WidthWrapper } from "@/common/components/Wrappers/WidthWrapper"
import { CarFront, House, Palmtree, SlidersHorizontal } from "lucide-react"
import FilterPropertyModal from "./modals/filter-property"
import FilterRentalModal from "./modals/filter-rental"
import FilterActivityModal from "./modals/filter-activity"
import { usePathname } from "next/navigation"
import { Separator } from "../../ui/Separator"
import Tooltip from "./modals/components/tooltip"
import { useSearchStore } from "@/common/store/useSearchStore"

function FilterHeader({
  contentWidth = "medium",
}: {
  readonly contentWidth?: "medium" | "small" | "wide" | "full"
}) {
  const links = [
    { href: LINK_SEARCH_PROPERTY, icon: House, category: "Places to stay" },
    { href: LINK_SEARCH_ACTIVITIES, icon: Palmtree, category: "Activities" },
    { href: LINK_SEARCH_RENTAL, icon: CarFront, category: "Rentals" },
  ];

  const pathname = usePathname();
  const [activeModal, setActiveModal] = useState<string>("");
  const [tooltipVisible, setTooltipVisible] = useState<{ [key: string]: boolean }>({});
  const { setPathCategory } = useSearchStore(state => state);

  const handleButtonClick = (filterType: string) => {
    setActiveModal(filterType);
  };

  return (
    <header className="w-full bg-white">
      <WidthWrapper width={contentWidth}>
        <nav className="flex items-center py-2 my-2 w-full gap-8 relative" aria-label="Global">
          {links.map(({ href, icon: Icon, category }) => {
            const isSelected = pathname === href; 
            return (
              <div className="flex gap-x-7 items-center relative" key={href}>
                <Link href={href} onClick={() => setPathCategory(href)}>
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full 
                      ${isSelected ? "bg-primary-500" : "bg-gray-100"}`}
                    onMouseEnter={() => setTooltipVisible((prev) => ({ ...prev, [category]: true }))}
                    onMouseLeave={() => setTooltipVisible((prev) => ({ ...prev, [category]: false }))}
                  >
                    <Icon size={20} className={isSelected ? "text-white" : "text-gray-500"} />
                    <Tooltip text={category} visible={tooltipVisible[category]!} />
                  </div>
                </Link>
              </div>
            );
          })}
          <Separator orientation="vertical" className="bg-gray-300 h-8" />
          <Button
            variant={"outline"}
            size="sm"
            className="gap-2 items-center text-center"
            onClick={() => handleButtonClick(pathname)}
          >
            <SlidersHorizontal size={12} /> <div>Filters</div>
          </Button>
        </nav>
      </WidthWrapper>
      <FilterPropertyModal isOpen={activeModal === LINK_SEARCH_PROPERTY} onClose={() => handleButtonClick("")} />
      <FilterRentalModal isOpen={activeModal === LINK_SEARCH_RENTAL} onClose={() => handleButtonClick("")} />
      <FilterActivityModal isOpen={activeModal === LINK_SEARCH_ACTIVITIES} onClose={() => handleButtonClick("")} />
    </header>
  );
}

export default FilterHeader;
