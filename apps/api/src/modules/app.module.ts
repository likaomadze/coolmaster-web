import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ThrottlerModule } from "@nestjs/throttler";
import { AnalyticsModule } from "./analytics/analytics.module";
import { AuthModule } from "./auth/auth.module";
import { BookingModule } from "./booking/booking.module";
import { ChatModule } from "./chat/chat.module";
import { HealthModule } from "./health/health.module";
import { NotificationModule } from "./notification/notification.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ServiceModule } from "./service/service.module";
import { TechnicianModule } from "./technician/technician.module";
import { UploadModule } from "./upload/upload.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 120 }]),
    HealthModule,
    PrismaModule,
    AuthModule,
    ServiceModule,
    BookingModule,
    UserModule,
    TechnicianModule,
    ChatModule,
    NotificationModule,
    UploadModule,
    AnalyticsModule
  ]
})
export class AppModule {}
