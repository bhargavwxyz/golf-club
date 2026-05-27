# Backend

A simple Express + MongoDB backend for managing consumers, slots, offers, and analytics.

## Project structure

- `src/app.js` — Express application bootstrap
- `src/config` — application config
- `src/controllers` — route controllers
- `src/db` — MongoDB connection and collection constants
- `src/middlewares` — request logging and 404 handling
- `src/models` — data constants and document builders
- `src/repositories` — MongoDB repository layer
- `src/routes` — Express route definitions
- `src/services` — business logic and analytics
- `src/utils` — shared utilities

## API Routes

- `GET /api/offers` — manage offer resources
- `GET /api/consumers` — manage consumer resources
- `GET /api/slots` — manage slot resources
- `GET /api/analytics/funnel` — analytics funnel data
- `GET /api/analytics/kpis` — KPI metrics
- `GET /api/analytics/recent` — recent activity feed
- `GET /health` — health check endpoint




# 📦 Creating Orders via Postman

Follow these **3 steps in order** to create an order. Each step depends on the IDs returned from the previous one.

---

## Step 1 — Create a Consumer

**Method:** `POST`  
**URL:** `http://localhost:3000/api/consumers`

### Request Body

```json
{
  "name": "rosy",
  "email": "rosy@example.com",
  "phone": "+919955667788",
  "consumer_type": "new_user",
  "reliability_score": 788,
  "via_source": null,
  "avatar_color": "#F4D03F"
}
```

### Response

```json
{
  "ok": true,
  "data": {
    "_id": "6a16c6872c9e53ca7156c083",
    "name": "rosy",
    "email": "rosy@example.com",
    "phone": "+919955667788",
    "consumer_type": "new_user",
    "reliability_score": 788,
    "reliability_tier": "VIP",
    "via_source": null,
    "avatar_color": "#F4D03F",
    "created_at": "2026-05-27T10:25:11.605Z",
    "updated_at": "2026-05-27T10:25:11.605Z"
  }
}
```

> ⚠️ **Save the `_id` from the response** — you will need it as `consumer_id` in Step 3.
>
> Example: `"_id": "6a16c6872c9e53ca7156c083"`

---

## Step 2 — Create a Slot

**Method:** `POST`  
**URL:** `http://localhost:3000/api/slots`

### Request Body

```json
{
  "start_time": "2025-07-02T20:30:00.000Z",
  "end_time": "2025-07-02T22:00:00.000Z",
  "max_players": 558,
  "base_price": 90,
  "status": "available"
}
```

### Response

```json
{
  "ok": true,
  "data": {
    "_id": "6a16c6a12c9e53ca7156c084",
    "start_time": "2025-07-02T20:30:00.000Z",
    "end_time": "2025-07-02T22:00:00.000Z",
    "max_players": 558,
    "base_price": 90,
    "status": "available",
    "created_at": "2026-05-27T10:25:37.335Z",
    "updated_at": "2026-05-27T10:25:37.335Z"
  }
}
```

> ⚠️ **Save the `_id` from the response** — you will need it as `slot_id` in Step 3.
>
> Example: `"_id": "6a16c6a12c9e53ca7156c084"`

---

## Step 3 — Create an Offer

Use the IDs collected from Steps 1 and 2.

**Method:** `POST`  
**URL:** `http://localhost:3000/api/offers`

### Request Body

```json
{
  "consumer_id": "6a16c6872c9e53ca7156c083",
  "slot_id": "6a16c6a12c9e53ca7156c084",
  "amount": 9100,
  "player_count": 533,
  "loyalty_tag": "Delta"
}
```

| Field | Source |
|---|---|
| `consumer_id` | `_id` returned in Step 1 |
| `slot_id` | `_id` returned in Step 2 |
| `amount` | Set as needed |
| `player_count` | Set as needed |
| `loyalty_tag` | Set as needed |

---

## Quick Reference

| Step | Method | Endpoint | Returns |
|------|--------|----------|---------|
| 1. Create Consumer | `POST` | `/api/consumers` | `consumer_id` |
| 2. Create Slot | `POST` | `/api/slots` | `slot_id` |
| 3. Create Offer | `POST` | `/api/offers` | Order created ✅ |

---

> **Note:** All requests should include the header `Content-Type: application/json`.