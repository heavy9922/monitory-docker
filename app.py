from fastapi import FastAPI, Response
from prometheus_client import Counter, Gauge, Histogram, generate_latest, CONTENT_TYPE_LATEST

app = FastAPI()

http_request_counter = Counter(
    'http_requests_total', 
    'Total number of HTTP requests',
    ['method', 'route', 'status']
)

active_users_gauge = Gauge(
    'active_users', 
    'Number of active users'
)

response_time_histogram = Histogram(
    'http_response_time_seconds',
    'HTTP response times in seconds',
    buckets=[0.1, 0.5, 1, 5, 10]
)

@app.get("/metrics")
def expose_metrics():
    http_request_counter.labels(method="GET", route="/metrics", status="200").inc()  
    active_users_gauge.set(42)
    response_time_histogram.observe(1.2)

    return Response(generate_latest(), media_type=CONTENT_TYPE_LATEST)
