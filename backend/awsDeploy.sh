aws cloudformation deploy \
   --template-file ecs.yml \
   --region ap-southeast-1 \
   --stack-name nusocialife \
   --capabilities CAPABILITY_NAMED_IAM

aws cloudformation deploy \
   --template-file userService.yml \
   --region ap-southeast-1 \
   --stack-name userMicroservice \
   --capabilities CAPABILITY_NAMED_IAM

aws cloudformation deploy \
   --template-file forumService.yml \
   --region ap-southeast-1 \
   --stack-name forumMicroservice \
   --capabilities CAPABILITY_NAMED_IAM
#
aws cloudformation deploy \
   --template-file findFriendService.yml \
   --region ap-southeast-1 \
   --stack-name findFriendMicroservice \
   --capabilities CAPABILITY_NAMED_IAM

aws cloudformation deploy \
  --template-file chatService.yml \
  --region ap-southeast-1 \
  --stack-name chatMicroservice\
  --capabilities CAPABILITY_NAMED_IAM
