import { Briefcase } from "lucide-react";
import { ReactNode } from "react";

interface Benefit {
  id: string;
  label: string;
  icon: ReactNode;
}


const benefits=[
    {
        id:'401k',label:'402(k)',icon:<Briefcase className='w-3 h-3'/>
    },
        {
        id:'distributed',label:'Distributed team',icon:<Users className='w-3 h-3'/>
    }
]
