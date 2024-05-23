import { Container, Hero } from '@/components/common'
import Skeleton from 'react-loading-skeleton'

export const RecipeHeroSkeleton = () => {
    return (
        <Hero lg>
            <Container className="lg:absolute lg:left-0 lg:right-0 grid lg:grid-cols-2 items-center">
                <div className="mr-2">
                    <Skeleton height={60} />
                    <Skeleton height={128} />
                    <Skeleton width={260} height={36} />
                </div>
                <Skeleton height={338} className="hidden lg:block rounded" />
            </Container>
        </Hero>
    )
}
