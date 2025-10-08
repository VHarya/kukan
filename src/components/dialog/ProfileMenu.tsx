import { useEffect, useState } from "react";
import Image from "next/image";
import ProfilePlaceholder from "@/images/profile_placeholder.png";
import { authClient } from "@/libs/authClient";
import {
  FloatingPortal,
  offset,
  useDismiss,
  useFloating,
  useInteractions,
} from "@floating-ui/react";
import {
  LucideCircleQuestionMark,
  LucideInfo,
  LucideLogOut,
  LucideUser2,
} from "lucide-react";
import { useRouter } from "next/navigation";

type SessionData = {
  user: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null | undefined;
  };
  session: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    expiresAt: Date;
    token: string;
    ipAddress?: string | null | undefined;
    userAgent?: string | null | undefined;
  };
} | null;

export default function ProfileMenu() {
  const [showDialog, setShowDialog] = useState(false);
  const [sessionData, setSessionData] = useState<SessionData>();
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const { refs, floatingStyles, context } = useFloating({
    open: showDialog,
    onOpenChange: setShowDialog,
    placement: "bottom-end",
    middleware: [offset(16)],
  });

  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);

  useEffect(() => {
    async function loadSession() {
      const { data } = await authClient.getSession();
      setSessionData(data);
      setIsLoading(false);
    }

    loadSession();
  }, []);

  if (isLoading) {
    return (
      <div className="w-10 h-10 rounded-full overflow-clip bg-[#c0c0c0]">
        <div className="w-full h-full animate-pulse bg-[#e0e0e0]"></div>
      </div>
    );
  }

  return (
    <>
      <button
        ref={refs.setReference}
        type="button"
        onClick={(e) => {
          setShowDialog(true);
        }}
        {...getReferenceProps}
      >
        <Image
          src={sessionData?.user.image ?? ProfilePlaceholder}
          alt="Profile Image"
          className="w-10 h-10 rounded-full"
        />
      </button>

      {showDialog && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={{ ...floatingStyles }}
            className="w-fit p-2 flex flex-col rounded-xl font-sans drop-shadow bg-surface"
            {...getFloatingProps}
          >
            <span className="mx-2 mt-2 font-medium">
              {sessionData?.user.name}
            </span>
            <span className="mx-2 mb-2 text-sm text-disabled">
              {sessionData?.user.email}
            </span>

            <div className="h-[1.25px] mx-2 mb-1 bg-[#cccccc]"></div>

            <button className="p-2 flex items-center">
              <LucideUser2 size={18} className="mr-2" />
              <span className="text-sm">Profile</span>
            </button>
            <button className="p-2 flex items-center">
              <LucideCircleQuestionMark size={18} className="mr-2" />
              <span className="text-sm">FAQ</span>
            </button>
            <button className="p-2 flex items-center">
              <LucideInfo size={18} className="mr-2" />
              <span className="text-sm">About</span>
            </button>
            <button
              onClick={() => {
                authClient.signOut().then((val) => {
                  router.replace("/login");
                });
              }}
              className="p-2 flex items-center"
            >
              <LucideLogOut size={18} className="mr-2" />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </FloatingPortal>
      )}
    </>
  );
}
