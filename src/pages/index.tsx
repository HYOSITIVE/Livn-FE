// import Image from "next/image";
// import { Geist, Geist_Mono } from "next/font/google";

import MatchingItem from "@/components/MatchingItem";
import { useAuth } from "@/hooks/useAuth";
import { UserType, UserProfile } from "@/types/user";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const { user, login } = useAuth();
  const router = useRouter();
  const [isTenantValue, setIsTenantValue] = useState<UserProfile>();
  const [isLandlordValue, setIsLandlordValue] = useState<UserProfile>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
        console.log("apiEndpoint", apiEndpoint);
        const res = await fetch(`${apiEndpoint}/user?isLimited=true`);
        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await res.json();
        const tenant = data.data.find((x: UserProfile) => x.type === "tenant");
        const landlord = data.data.find(
          (x: UserProfile) => x.type === "landlord"
        );

        if (tenant) {
          setIsTenantValue(tenant);
        }
        if (landlord) {
          setIsLandlordValue(landlord);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleLogin = async (type: UserType) => {
    let selectedUser; // 선택된 역할의 유저 정보 가져오기

    if (type === "tenant") {
      selectedUser = isTenantValue;
    }
    if (type === "landlord") {
      selectedUser = isLandlordValue;
    }

    if (!selectedUser) {
      console.error("User not found for the selected role.");
      return;
    }

    login(selectedUser); // Context API에 저장
    router.push("/"); // 로그인 후 프로필 페이지로 이동
  };

  return (
    <div>
      {user ? (
        <MatchingItem />
      ) : (
        <div className="max-w-custom-md mx-auto flex justify-center gap-10">
          <div onClick={() => handleLogin("tenant")}>
            <div className="bg-gray-200 w-48 h-[211px] overflow-hidden">
              <Image
                src={
                  isTenantValue?.image_url ??
                  "https://live.staticflickr.com/3181/2579354912_ff453014f4.jpg"
                }
                className="object-cover w-full h-full"
                width={192}
                height={211}
                alt="Tenant"
              />
            </div>
            <h2 className="h2 text-center">Tenant</h2>
          </div>
          <div onClick={() => handleLogin("landlord")}>
            <div className="bg-gray-200 w-48 h-[211px] overflow-hidden">
              <Image
                src={
                  isLandlordValue?.image_url ??
                  "https://media.gettyimages.com/id/609883286/es/foto/west-hollywood-ca-kimberly-robinson-attends-chanel-dinner-celebrating-n-5-leau-at-the-sunset.jpg?s=612x612&w=gi&k=20&c=X_gmo08nPX7hcyvmV0bNWEK0BLykcOxLvd6jdZp9t7I="
                }
                className="object-cover w-full h-full"
                width={192}
                height={211}
                alt="Landlord"
              />
            </div>
            <h2 className="h2 text-center">Landlord</h2>
          </div>
        </div>
      )}
    </div>
  );
}
