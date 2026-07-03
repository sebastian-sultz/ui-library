"use client";

import DocumentIcon from "@/assets/icons/DocumentIcon";
import { Upload } from "lucide-react";

import { cn } from "@/lib/utils";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { Button } from "./button";

import { fileToBase64 } from "@/lib/helpers";
import { MAX_FILE_SIZE } from "@/utils/constants";
import { toast } from "sonner";
import { formatName } from "@/lib/helpers";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DocumentUploadProps {
  documentName: string;
  tooltipContent?: React.ReactNode | string;
  /** When set, file is passed without base64 conversion (for direct S3 presigned uploads). */
  onFileSelect?: (file: File) => void | Promise<void>;
  onFileChange?: (file: File, base64: string) => void;
  onError?: (error: string) => void;
  onLoadingChange?: (loading: boolean) => void;
  error?: string;
  loading?: boolean;
  accept?: string;
  className?: string;
  fileDetails?: string;
  alreadyUploaded?: string;
  maxSize?: number;
}

const DocumentUpload: FC<DocumentUploadProps> = ({
  documentName,
  tooltipContent,
  onFileSelect,
  onFileChange,
  onError,
  onLoadingChange,
  error,
  accept,
  className,
  fileDetails,
  alreadyUploaded,
  loading = false,
  maxSize = MAX_FILE_SIZE,
}) => {
  const [fileName, setFileName] = useState<string>(fileDetails || "");
  const [isConverting, setIsConverting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const lastRequestRef = useRef<number>(0);

  useEffect(() => {
    if (fileDetails) {
      setFileName(fileDetails);
    }
  }, [fileDetails]);

  const hasError = !!error;
  const hasFile = !!fileName || !!alreadyUploaded;
  const isBusy = loading || isConverting;

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedFormats =
        accept?.split(",").map((type) => type.trim().toLowerCase()) || [];

      const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`;

      const mimeType = file.type.toLowerCase();

      const isValidType =
        allowedFormats.length === 0 ||
        allowedFormats.some((type) => {
          // MIME type check
          if (type.includes("/")) {
            return mimeType === type;
          }

          // Extension check
          return fileExtension === type;
        });

      if (!isValidType) {
        const errorMsg = `Invalid file format. ${supportedFormatsText}`;

        toast.error(errorMsg);

        setFileName("");

        onError?.(errorMsg);

        onLoadingChange?.(false);

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }

        return;
      }

      const requestId = ++lastRequestRef.current;
      const sizeInMB = (maxSize / (1024 * 1024)).toFixed(1);
      if (file.size > maxSize) {
        if (requestId !== lastRequestRef.current) return;
        const errorMsg = `${file.name} exceeds ${sizeInMB}MB size limit`;
        toast.error(errorMsg);
        setFileName(file.name);
        onError?.(errorMsg);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        return;
      }

      setFileName(file.name);
      setIsConverting(true);
      onLoadingChange?.(true);

      try {
        if (onFileSelect) {
          await onFileSelect(file);
          if (requestId !== lastRequestRef.current) return;
        } else {
          const base64 = await fileToBase64(file);
          if (requestId !== lastRequestRef.current) return;
          onFileChange?.(file, base64);
        }
      } catch (err: any) {
        if (requestId !== lastRequestRef.current) return;
        const errorMsg = err.message || "Failed to process file";
        toast.error(errorMsg);
        onError?.(errorMsg);
      } finally {
        if (requestId === lastRequestRef.current) {
          setIsConverting(false);
          onLoadingChange?.(false);
        }
      }
    }
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const resetInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const docName = formatName(documentName || "");

  const supportedFormatsText = accept
    ? `Supports ${accept
        .split(",")
        .map((f) =>
          f.includes("/")
            ? f.split("/")[1].toUpperCase()
            : f.replace(".", "").toUpperCase().trim(),
        )
        .join(", ")}`
    : "";

  const displayFileName = fileName
    ? fileName.length > 18
      ? `${fileName.slice(0, 10)}...${fileName.split(".").pop()}`
      : fileName
    : "Uploaded";

  return (
    <>
      {!hasFile ? (
        <div
          onClick={openFilePicker}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openFilePicker();
            }
          }}
          tabIndex={0}
          role="button"
          aria-label={`Upload ${docName}`}
          className={cn(
            "p-5 rounded-xl border border-dashed border-main-primary inline-flex flex-col gap-2.5 cursor-pointer relative",
            hasError ? "border-error-main" : "border-text-tertiary",
            isBusy && "pointer-events-none",
            className,
          )}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <DocumentIcon
                className={cn(
                  "w-10 h-10",
                  hasError ? "text-error-main" : "text-main-primary",
                )}
              />
              <div className="flex flex-col gap-1">
                <div className="flex gap-2">
                  <div className="text-base font-bold text-text-secondary">
                    {docName ?? "Image"}
                  </div>
                  {tooltipContent && (
                    <Tooltip>
                      <TooltipTrigger onClick={(e) => e.stopPropagation()}>
                        <Info className="h-3.5 w-3.5" />
                      </TooltipTrigger>
                      <TooltipContent>{tooltipContent}</TooltipContent>
                    </Tooltip>
                  )}
                </div>
                <div className="text-xs text-text-secondary">
                  {supportedFormatsText}
                </div>
              </div>
            </div>

            {isBusy ? (
              <div className="text-sm italic animate-shimmer">Uploading...</div>
            ) : (
              <Button
                variant="text"
                onClick={(e) => {
                  e.stopPropagation();
                  openFilePicker();
                }}
                className="w-4 h-4 cursor-pointer"
                startIcon={
                  <Upload
                    className={cn(
                      hasError ? "text-error-main" : "text-main-primary",
                    )}
                  />
                }
              ></Button>
            )}
          </div>
        </div>
      ) : (
        <div className={cn("rounded-xl flex flex-col gap-2", className)}>
          <div
            className={cn(
              "p-3 rounded-md border flex flex-col gap-2.5 relative",
              hasError ? "border-error-main" : "border-text-tertiary",
              isBusy && "pointer-events-none",
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DocumentIcon
                  className={cn(
                    "w-6 h-6",
                    hasError ? "text-error-main" : "text-main-primary",
                  )}
                />
                <div className="text-base font-bold text-text-secondary">
                  {docName ?? "Image"}
                </div>
              </div>

              <div
                className={cn(
                  "text-sm overflow-hidden text-ellipsis whitespace-nowrap max-w-[120px]",
                  hasError ? "text-error-main" : "text-text-primary",
                )}
                title={fileName}
              >
                {error || (hasError ? "Error" : displayFileName)}
              </div>
            </div>
          </div>

          <div className="flex items-center px-2">
            <div
              className={cn(
                "flex flex-1 items-center gap-2",
                hasError ? "justify-between" : "justify-end",
              )}
            >
              {hasError && (
                <div className="text-xs text-text-secondary">
                  {supportedFormatsText}
                </div>
              )}
              {isBusy ? (
                <div className="text-sm italic animate-shimmer">
                  Uploading...
                </div>
              ) : (
                <Button
                  variant="text"
                  onClick={(e) => {
                    e.stopPropagation();
                    openFilePicker();
                  }}
                  className={cn(
                    "text-sm cursor-pointer p-0",
                    hasError ? "text-error-main" : "text-main-primary",
                  )}
                  endIcon={
                    <Upload
                      className={cn(
                        "h-3.5 w-3.5",
                        hasError ? "text-error-main" : "text-main-primary",
                      )}
                    />
                  }
                >
                  Re-Upload
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        hidden
        onChange={handleFileChange}
        onClick={resetInput}
      />
    </>
  );
};

export { DocumentUpload };
