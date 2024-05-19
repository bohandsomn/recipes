import Image from 'next/image'
import React, { FC } from 'react'
import { IRecipePreview } from '../types'

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
        <figure className="w-[280px] rounded-xl hover:shadow-slate-400 hover:shadow-lg transition-all">
            <Image
                src={image!}
                alt={name!}
                width={280}
                height={180}
                className="cursor-pointer rounded-tl-xl rounded-tr-xl w-[280px] h-[180px] object-cover"
            />
            <figcaption className="p-[10px] rounded-bl-xl rounded-br-xl">
                {/** TODO: Add link to recipe */}
                <h3 className="cursor-pointer w-fit">{name}</h3>
                <blockquote>
                    {description && <p className="text-ellipsis overflow-hidden whitespace-nowrap">{description}</p>}
                    {/** TODO: Add clock icon */}
                    {time && <p>{time}</p>}
                    {/** TODO: Add 5-stars view */}
                    {rating && <p>{rating}</p>}
                    {/** TODO: Add wish button */}
                </blockquote>
            </figcaption>
        </figure>
    )
}
