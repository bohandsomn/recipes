import Skeleton from 'react-loading-skeleton'
import { Container, Hero } from '@/components/common'

export const RecipeHeroSkeleton = () => {
    return (
        <Hero lg>
            <Container className="grid items-center lg:absolute lg:left-0 lg:right-0 lg:grid-cols-2">
                <div className="mr-2">
                    <Skeleton height={60} />
                    <Skeleton height={128} />
                    <Skeleton width={260} height={36} />
                </div>
                <Skeleton height={338} className="hidden rounded lg:block" />
            </Container>
        </Hero>
    )
}
