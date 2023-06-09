import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    overwrite: true,
    schema: "https://eu-central-1-shared-euc1-02.cdn.hygraph.com/content/cliotz5nm0i0i01ulevu1dvgw/master",
    documents: "src/graphql",
    generates: {
        "src/generated/graphql.ts": {
            plugins: [
                "typescript",
                "typescript-operations",
                "typescript-generic-sdk",
            ],
        },
    },
    config: {
        dedupeFragments: true,
    },
};

export default config;
