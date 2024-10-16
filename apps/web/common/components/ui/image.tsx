"use client"
import React, { useState } from 'react'
import NextImage from 'next/image';
import { GRAY_BASE64, IMAGE_FALLBACK } from '@/common/constants';

const Image = (props: React.ComponentProps<typeof NextImage> & { fallbackSrc?: string }) => {
  const { src, fallbackSrc = IMAGE_FALLBACK, placeholder = `blur`, blurDataURL = GRAY_BASE64, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);

  return (
      <NextImage
          {...rest}
          src={imgSrc}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          onError={() => {
              setImgSrc(fallbackSrc);
          }}
      />
  );
}

export default Image