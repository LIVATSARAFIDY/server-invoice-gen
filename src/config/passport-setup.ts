import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "YOUR_GOOGLE_CLIENT_SECRET";

passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: "/api/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            const email = profile.emails?.[0]?.value;
            if (!email) {
                return done(null, false, {message: "No email found in Google profile"});
            }
            try {
                let user = await prisma.user.findUnique({ where: { email } });
                if (!user) {
                    user = await prisma.user.create({
                        data: {
                            email,
                            firstname: profile.name?.givenName || "",
                            lastname: profile.name?.familyName || "",
                            userStatus: "TRIAL", 
                            roleId: 1,
                            password: "", 
                        },
                    });
                }
                return done(null, user);
            } catch (error) {
                console.error("Error during Google authentication:", error);
            }
        }
    )
)

passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
    try {
        const user = await prisma.user.findUnique({ where: { id } });
        done(null, user);
    } catch (error) {
        done(error);
    }
});