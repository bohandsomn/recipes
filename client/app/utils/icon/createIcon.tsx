import { FC, memo } from 'react'
import { Icon, IIconProps } from './components'

export function createIcon(initialProps: IIconProps): FC<Partial<IIconProps>> {
    return memo((props) => {
        return <Icon {...initialProps} {...props} />
    })
}
