import { useState, type ImgHTMLAttributes } from "react";

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4='

export function ImageWithFallback(props: ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false);

  const {
    src,
    alt = "",
    style,
    className,
    loading = "lazy",
    decoding = "async",
    onError,
    ...rest
  } = props;

  if (didError) {
    return (
      <div
        className={`inline-block align-middle bg-neutral-100 text-center ${className ?? ""}`}
        style={style}
        role={alt ? "img" : undefined}
        aria-label={alt || undefined}
      >
        <div className="flex h-full w-full items-center justify-center">
          <img
            src={ERROR_IMG_SRC}
            alt=""
            {...rest}
            data-original-url={src}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      loading={loading}
      decoding={decoding}
      {...rest}
      onError={(event) => {
        onError?.(event);
        setDidError(true);
      }}
    />
  );
}
