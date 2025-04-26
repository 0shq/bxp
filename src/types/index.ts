export type TopTab = 'explore' | 'connect' | 'jobs' | 'learn' | 'profile'
export type BottomTab = {
  explore: 'world' | 'regional' | 'following' | 'groups' | 'news/trending'
  connect: 'direct msg' | 'email' | 'groups' | 'private'
  jobs: 'jobs' | 'bounty' | 'contribute' | 'resume'
  learn: 'lessons' | 'quiz' | 'challenges' | 'mentor'
  profile: 'showcase' | 'experience' | 'skills' | 'portfolio'
}[TopTab] 