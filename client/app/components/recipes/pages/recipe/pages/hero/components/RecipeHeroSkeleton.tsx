import { Container } from '@/components/common'
import Skeleton from 'react-loading-skeleton'

export const RecipeHeroSkeleton = () => {
    return (
        <Container className="grid lg:grid-cols-2 items-center">
            <div>
                <Skeleton height={60} />
                <Skeleton height={128} />
                <Skeleton width={260} height={36} />
            </div>
            <Skeleton height={300} className="hidden lg:block rounded" />
        </Container>
    )
}
