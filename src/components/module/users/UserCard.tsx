import { Button } from "@/components/ui/button";
import { removeUser } from "@/redux/features/user/userSlice";
import { useAppDispatch } from "@/redux/hook";
import type { IUser } from "@/types";
import { Trash2} from "lucide-react";

interface IProps {
  user: IUser;
}

export default function UserCard({ user }: IProps) {
  const dispatch = useAppDispatch();

  return (
    <div
      className="border px-5 py-3 rounded-md hover:shadow cursor-pointer transition"
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <h1>{user.name}</h1>
        </div>
        <div
          className="flex items-center"
          onClick={(e) => e.stopPropagation()} // stop full-card click
        >
          <Button
            onClick={() => dispatch(removeUser(user.id))}
            variant="link"
            className="p-0 text-red-500"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
