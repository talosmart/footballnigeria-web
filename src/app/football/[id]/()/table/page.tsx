"use client";

import MatchTable from "@/components/ui/MatchTable";
import { useState } from "react";

const Table = () => {
    const [activeTab, setActiveTab] = useState("all");
      const [activeMatchTab, setActiveMatchTab] = useState("all");
    return  <MatchTable activeTab={activeTab} activeMatchTab={activeMatchTab} setActiveTab={setActiveTab} setActiveMatchTab={setActiveMatchTab} />
}

export default Table;