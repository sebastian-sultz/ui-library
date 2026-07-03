import DealsIcon from "@/assets/icons/DealsIcon";
import { formatAmountInr } from "@/lib/helpers";
import { LineDivider } from "./line-divider";
import {ProgressBar} from "./progress-bar";

type DealsCardProps = {
  buyerName?: string;
  sellerName?: string;
  unitCost?: number;
  repayment?: number;
  rateLabel?: string;
  rateValue?: string;
  unitsLeft?: number;
  totalUnits?: number;
  tenure?: string;
  progressPercentage?: number;
  className?: string;
  onClick?: () => void;
  href?: string;
};

const DealsCard = ({
  buyerName = "Amplio Capital Private Limited",
  sellerName = "Falcon Logistics Enterprise",
  unitCost = 10000,
  repayment = 10230,
  rateLabel = "XIRR",
  rateValue = "14%",
  unitsLeft = 143,
  totalUnits = 150,
  tenure = "60 Days",
  progressPercentage = 60,
  className,
  onClick,
  href,
}: DealsCardProps) => {
  const cardContent = (
    <div
      onClick={onClick}
      className={`bg-white min-w-116 max-w-fit rounded-xl p-5 border border-divider-main transition-all duration-200 ${
        onClick || href ? "cursor-pointer  hover:shadow-primary" : ""
      } ${className || ""}`}
    >
      <div className="flex flex-col gap-6 items-center">
        <div className="flex flex-col gap-1 w-full">
          <div className="flex justify-between items-center w-full">
            <span className="text-xs text-text-secondary">Buyer</span>
            <span className="text-xs text-text-secondary">Seller</span>
          </div>
          <div className="flex justify-between items-center w-full">
            <div className="flex gap-3 w-45 items-center">
              <DealsIcon />
              <span className="flex-1 text-sm font-medium line-clamp-2">
                {buyerName}
              </span>
            </div>
            <div className="flex gap-3 w-45 items-center">
              <span className="flex-1 text-sm font-medium line-clamp-2 text-right">
                {sellerName}
              </span>

              <DealsIcon />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-between">
          <div className="flex items-center justify-center gap-3">
            <div className="flex flex-col gap-0">
              <span className="text-xs text-text-secondary">Unit Cost</span>
              <span className="text-sm text-text-primary font-bold">
                {formatAmountInr(unitCost)}
              </span>
            </div>
            <LineDivider variant="vertical" />
            <div className="flex flex-col gap-0">
              <span className="text-xs text-text-secondary">Repayment</span>
              <span className="text-sm text-success-main font-bold">
                {formatAmountInr(repayment)}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-0 text-right">
            <span className="text-xs text-text-secondary">{rateLabel}</span>
            <span className="text-sm text-text-primary font-bold">
              {rateValue}
            </span>
          </div>
        </div>

        <ProgressBar
          remaining={progressPercentage}
          used={100 - progressPercentage}
        />
        <div className="w-full flex justify-between">
          <div className="flex flex-col gap-0">
            <span className="text-xs text-text-secondary">Units Left</span>
            <div className="flex">
              <span className="text-sm text-text-primary font-bold">
                {unitsLeft}
              </span>
              <span className="text-sm text-text-secondary font-bold">
                /{totalUnits}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-0">
            <span className="text-xs text-text-secondary text-right">
              Tenure{" "}
            </span>
            <span className="text-sm text-text-primary font-bold">
              {tenure}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="no-underline block h-full">
        {cardContent}
      </a>
    );
  }

  return cardContent;
};

export { DealsCard };
