import type { Icon } from '@phosphor-icons/react/dist/lib/types';
import { ChartPie as ChartPieIcon } from '@phosphor-icons/react/dist/ssr/ChartPie';
import { GearSix as GearSixIcon } from '@phosphor-icons/react/dist/ssr/GearSix';
import { PlugsConnected as PlugsConnectedIcon } from '@phosphor-icons/react/dist/ssr/PlugsConnected';
import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';
import { XSquare } from '@phosphor-icons/react/dist/ssr/XSquare';
import {CashRegister} from '@phosphor-icons/react/dist/ssr/CashRegister';
import {Cheese} from '@phosphor-icons/react/dist/ssr/Cheese';
import {Package} from '@phosphor-icons/react/dist/ssr/Package';
import {AddressBook} from '@phosphor-icons/react/dist/ssr/AddressBook';



export const navIcons = {
  'chart-pie': ChartPieIcon,
  'gear-six': GearSixIcon,
  'plugs-connected': PlugsConnectedIcon,
  'x-square': XSquare,
  'cash-register': CashRegister,
  'cheese': Cheese,
  'package': Package,
  'address-book': AddressBook,
  
  user: UserIcon,
  users: UsersIcon,
} as Record<string, Icon>;
