-- CreateTable
CREATE TABLE "UserResponseTest" (
    "userId" TEXT NOT NULL,
    "testId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserResponseTest_pkey" PRIMARY KEY ("userId","createdAt","testId")
);

-- CreateTable
CREATE TABLE "Response" (
    "id" TEXT NOT NULL,
    "itemQuestionId" TEXT NOT NULL,
    "userResponseTestTestId" TEXT,
    "userResponseTestUserId" TEXT,
    "userResponseTestCreatedAt" TIMESTAMP(3),

    CONSTRAINT "Response_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserResponseTest" ADD CONSTRAINT "UserResponseTest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserResponseTest" ADD CONSTRAINT "UserResponseTest_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_itemQuestionId_fkey" FOREIGN KEY ("itemQuestionId") REFERENCES "ItemQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_userResponseTestUserId_userResponseTestCreatedAt__fkey" FOREIGN KEY ("userResponseTestUserId", "userResponseTestCreatedAt", "userResponseTestTestId") REFERENCES "UserResponseTest"("userId", "createdAt", "testId") ON DELETE SET NULL ON UPDATE CASCADE;
