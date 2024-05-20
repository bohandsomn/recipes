import Image from 'next/image'
import React, { FC } from 'react'
import Link from 'next/link'
import { Page } from '@/constants'
import { FiveStars } from './FiveStars'
import { Time } from './Time'
import { WishRecipe } from './WishRecipe'
import { IRecipePreview } from '../types'
import { fontCommon } from '@/fonts'

interface IRecipePreviewProps extends IRecipePreview { }

export const RecipePreview: FC<IRecipePreviewProps> = ({
    recipeCredentials,
    name,
    description,
    time,
    image,
    rating,
}) => {
    return (
        <figure className="w-[280px] rounded-xl hover:shadow-black-400 hover:shadow-lg transition-all bg-white relative">
            <Link href={`${Page.RECIPES}/${recipeCredentials}`}>
                <Image
                    src={image!}
                    alt={name!}
                    title={name!}
                    width={280}
                    height={180}
                    draggable={false}
                    className="cursor-pointer rounded-tl-xl rounded-tr-xl w-[280px] h-[180px] object-cover"
                />
            </Link>
            <figcaption className="p-[10px] rounded-bl-xl rounded-br-xl">
                <Link href={`${Page.RECIPES}/${recipeCredentials}`}>
                    <h3 className={`${fontCommon.className} font-bold cursor-pointer w-fit`} title={name!}>{name}</h3>
                </Link>
                <div className="space-y-1">
                    {description && <p className="text-ellipsis overflow-hidden whitespace-nowrap">{description}</p>}
                    <div className="flex flex-row justify-between items-center">
                        {time ? <Time time={time} /> : null}
                        {rating ? <FiveStars rating={rating} /> : null}
                    </div>
                </div>
            </figcaption>
            <div className="absolute top-2 right-2">
                <WishRecipe recipeCredentials={recipeCredentials} />
            </div>
        </figure>
    )
}
