"use client";

import React, { useState } from "react";
import { formatAmountInr } from "@/lib/helpers";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import UserIcon from "@/assets/icons/UserIcon";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface VerificationCodeModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  investorName?: string;
  phoneNumber?: string;
  onConfirm?: (code: string) => void;
  onResend?: () => void;
  withdrawalAmount?: number;
  description?: React.ReactNode;
  loading?: boolean;
}

const VerificationCodeModal = ({
  isOpen,
  onOpenChange,
  investorName,
  phoneNumber,
  onConfirm,
  onResend,
  withdrawalAmount,
  description,
  loading = false,
}: VerificationCodeModalProps) => {
  const [code, setCode] = useState("");

  const handleConfirm = () => {
    if (code.length === 6) {
      onConfirm?.(code);
      onOpenChange(false);
      setCode("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[35vw]">
        <DialogHeader className="items-center text-center" showDivider={true}>
          <div className="flex flex-col items-center gap-0">
            {withdrawalAmount ? (
              <DialogTitle className="text-2xl">
                <span className="text-text-secondary">Withdrawal of </span>{" "}
                {formatAmountInr(withdrawalAmount)}
              </DialogTitle>
            ) : (
              <div className="flex items-center gap-2 select-none">
                <div className="flex items-center justify-center bg-background-secondary rounded-full w-8 h-8">
                  <UserIcon className="w-3.5 h-3.5" />
                </div>
                <DialogTitle>{investorName}</DialogTitle>
              </div>
            )}
            <DialogDescription>{description}</DialogDescription>
          </div>
        </DialogHeader>

        {/* Modal Body */}
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex flex-col items-center gap-0">
            <span className="text-xl font-bold text-text-primary">
              Enter Verification Code
            </span>
            <span className="text-[0.9rem] font-figtree text-text-secondary">
              We’ve sent a code to{" "}
              <span className="font-bold text-text-primary">{phoneNumber}</span>
            </span>
          </div>
          <div className="flex flex-col gap-1 justify-center items-center">
            <InputOTP
              maxLength={6}
              value={code}
              onChange={setCode}
              containerClassName="justify-center"
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>

            <span className="text-xs text-text-secondary">
              Didn't received a code?
              <Button
                size={"small"}
                variant={"text"}
                className="underline font-bold"
                onClick={onResend}
              >
                {" "}
                Re-send
              </Button>
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <DialogFooter>
          <div className="w-full flex justify-between gap-4">
            <Button
              variant="outline"
              onClick={() => {
                onOpenChange(false);
                setCode("");
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={code.length < 6}
              loading={loading}
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { VerificationCodeModal };
