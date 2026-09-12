# auth.md

Insurance Support (insurancesupport.online) is an informational website providing insurance guidance, claim assistance, and advisory services.

## Identity

Insurance Support is operated by Hari Kotian, an IRDAI-registered insurance advisor (Reg No: 0149161D), based in Bengaluru, India.

## Registration

No agent registration is required to access public content. All pages, blog posts, calculators, and tools are freely available without authentication.

## API Endpoints

The following public endpoints are available without authentication:

- `GET /.well-known/api-catalog` — RFC 9727 API catalog (application/linkset+json)
- `GET /openapi.json` — OpenAPI 3.0 specification
- `GET /health.json` — Health check endpoint
- `GET /api/geo` — Visitor geolocation

## Authentication

No authentication is required for any public endpoint. If authentication is added in the future, it will be documented here and in the OAuth Protected Resource Metadata at `/.well-known/oauth-protected-resource`.

## Contact

For inquiries: [https://insurancesupport.online/contact](https://insurancesupport.online/contact)
Phone: +91-9986634506
