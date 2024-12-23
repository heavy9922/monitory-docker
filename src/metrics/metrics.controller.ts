import { Controller, Get, Header } from '@nestjs/common';
import { Counter, Gauge, Histogram, Summary, register } from 'prom-client';

// Ejemplo de contador para solicitudes HTTP
const httpRequestCounter = new Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status'],
});

// Ejemplo de métrica de gauge para usuarios activos
const activeUsersGauge = new Gauge({
    name: 'active_users',
    help: 'Number of active users',
});

// Ejemplo de histograma para tiempos de respuesta
const responseTimeHistogram = new Histogram({
    name: 'http_response_time_seconds',
    help: 'HTTP response times in seconds',
    buckets: [0.1, 0.5, 1, 5, 10],
});

@Controller('metrics')
export class MetricsController {
    @Get()
    @Header('Content-Type', 'text/plain') // Prometheus requiere text/plain
    async exposeMetrics(): Promise<string> {
        // Actualizar las métricas personalizadas
        httpRequestCounter.inc({ method: 'GET', route: '/metrics', status: 200 }); // Incrementar contador
        activeUsersGauge.set(Math.floor(Math.random() * 100)); // Simular usuarios activos
        responseTimeHistogram.observe(Math.random() * 5); // Simular tiempos de respuesta

        // Devuelve todas las métricas registradas en formato Prometheus
        return register.metrics();
    }
}
