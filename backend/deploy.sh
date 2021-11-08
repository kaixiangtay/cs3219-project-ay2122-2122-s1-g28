aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws/a0f1y0x2

docker tag users:latest public.ecr.aws/a0f1y0x2/users:latest

docker tag forum:latest public.ecr.aws/a0f1y0x2/forum:latest

docker tag findfriend:latest public.ecr.aws/a0f1y0x2/findfriend:latest

docker tag chat:latest public.ecr.aws/a0f1y0x2/chat:latest

docker push public.ecr.aws/a0f1y0x2/users:latest

docker push public.ecr.aws/a0f1y0x2/forum:latest

docker push public.ecr.aws/a0f1y0x2/findfriend:latest

docker push public.ecr.aws/a0f1y0x2/chat:latest

docker-compose up -d

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

aws cloudformation deploy \
   --template-file findfriendService.yml \
   --region ap-southeast-1 \
   --stack-name findfriendMicroservice \
   --capabilities CAPABILITY_NAMED_IAM

aws cloudformation deploy \
  --template-file chatService.yml \
  --region ap-southeast-1 \
  --stack-name chatMicroservice\
  --capabilities CAPABILITY_NAMED_IAM
