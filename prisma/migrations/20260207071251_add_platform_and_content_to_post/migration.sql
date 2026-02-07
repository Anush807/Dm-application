-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "content" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "platform" TEXT NOT NULL DEFAULT 'unknown';
