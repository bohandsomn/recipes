import { FC, PropsWithChildren } from 'react'

export const combineProviders = (
    providers: FC<PropsWithChildren>[],
): FC<PropsWithChildren> => {
    return providers.reduce(
        (AccumulatedProviders, Provider) =>
            ({ children }) => (
                <AccumulatedProviders>
                    <Provider>{children}</Provider>
                </AccumulatedProviders>
            ),
        ({ children }) => <>{children}</>,
    )
}
