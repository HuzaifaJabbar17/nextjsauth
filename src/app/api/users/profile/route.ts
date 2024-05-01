import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function POST(request: NextRequest) {
  try {
    // getDataFromToken returns userid
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");

    if (!user) {
      return NextResponse.json(
        { message: "No such user exist" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "User found", data: user },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
