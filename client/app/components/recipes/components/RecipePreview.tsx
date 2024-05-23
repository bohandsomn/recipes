import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'
import { Page } from '@/constants'
import { fontCommon } from '@/fonts'
import { IRecipePreview } from '../types'
import { FiveStars } from './FiveStars'
import { Time } from './Time'
import { WishRecipe } from './WishRecipe'

interface IRecipePreviewProps extends IRecipePreview {}

export const RecipePreview: FC<IRecipePreviewProps> = ({
    recipeCredentials,
    name,
    description,
    time,
    image,
    rating,
}) => {
    return (
        <figure className="hover:shadow-black-400 relative w-[164px] rounded-xl bg-white transition-all hover:shadow-lg sm:w-[272px] md:w-[368px] lg:w-[480px] xl:w-[280px]">
            <Link href={`/${Page.RECIPES}/${recipeCredentials}`}>
                <Image
                    src={image!}
                    alt={name!}
                    title={name!}
                    width={480}
                    height={180}
                    draggable={false}
                    className="h-[180px] w-[480px] cursor-pointer rounded-tl-xl rounded-tr-xl object-cover"
                />
            </Link>
            <figcaption className="rounded-bl-xl rounded-br-xl p-[10px]">
                <Link href={`/${Page.RECIPES}/${recipeCredentials}`}>
                    <h3
                        className={`${fontCommon.className} w-fit cursor-pointer font-bold`}
                        title={name!}
                    >
                        {name}
                    </h3>
                </Link>
                <div className="space-y-1">
                    {description && (
                        <p className="max-h-[72px] overflow-hidden">
                            {description}
                        </p>
                    )}
                    <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
                        {rating ? <FiveStars rating={rating} /> : null}
                        {time ? <Time time={time} /> : null}
                    </div>
                </div>
            </figcaption>
            <div className="absolute right-2 top-2">
                <WishRecipe recipeCredentials={recipeCredentials} />
            </div>
        </figure>
    )
}
