scheduler = Rufus::Scheduler.new

scheduler.cron("0 12 * * *") do
   MemberMailer.schedule_check(Member.all).deliver
end
