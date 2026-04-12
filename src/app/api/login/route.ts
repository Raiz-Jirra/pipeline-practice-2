import { NextRequest } from "next/server";
import { loginUser } from "@/tools/DataManager";

export function POST(request: NextRequest) {


    return loginUser(request);
}
