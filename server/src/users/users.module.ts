import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/database/prisma.service';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        privateKey: configService.get<string>('JWT_SECRET_KEY'),
        signOptions: {
          expiresIn: '1d',
          algorithm: 'HS512',
        },
        verifyOptions: {
          algorithms: ['HS512'],
        },
      }),
      inject: [ConfigService],
    }),
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   include: [UsersModule],
    //   context: ({ user }) => ({
    //     user,
    //   }),
    //   installSubscriptionHandlers: true,
    //   autoSchemaFile: true,
    //   playground: true,
    //   sortSchema: true,
    // }),
    ConfigModule,
  ],
  providers: [
    UsersResolver,
    UsersService,
    PrismaService,
    JwtStrategy,
    GqlAuthGuard,
  ],
  exports: [UsersService, JwtModule],
})
export class UsersModule {}
