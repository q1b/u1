CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`google_id` text,
	`name` text,
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
