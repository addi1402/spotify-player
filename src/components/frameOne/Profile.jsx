import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Profile() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Avatar
            alt="User Avatar"
            className="w-8 h-8 lg:w-10 lg:h-10 cursor-pointer text-white"
          >
            <AvatarImage
              src="/profile.png"
              className="object-cover bg-neutral-700"
            />
            <AvatarFallback className="bg-neutral-700">CN</AvatarFallback>
          </Avatar>
        </TooltipTrigger>
        <TooltipContent>
          <p>Your Profile</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
