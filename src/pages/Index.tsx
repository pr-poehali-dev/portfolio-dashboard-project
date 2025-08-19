import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { 
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

// Mock data
const kpiData = {
  totalPortfolio: 15600,
  activeProjects: 24,
  completedProjects: 18,
  riskProjects: 3,
  totalBudget: 15.6,
  usedBudget: 9.8,
  averageMargin: 18.5,
  onTimeDelivery: 92
};

const financialData = [
  { month: 'Янв', planned: 800, actual: 750, cumulative: 750 },
  { month: 'Фев', planned: 900, actual: 920, cumulative: 1670 },
  { month: 'Мар', planned: 1100, actual: 1050, cumulative: 2720 },
  { month: 'Апр', planned: 1200, actual: 1180, cumulative: 3900 },
  { month: 'Май', planned: 1300, actual: 1250, cumulative: 5150 },
  { month: 'Июн', planned: 1400, actual: 1380, cumulative: 6530 },
];

const progressData = [
  { name: 'ЖК Северный', physical: 85, financial: 78 },
  { name: 'Офис-Центр', physical: 92, financial: 88 },
  { name: 'ТРЦ Мега', physical: 45, financial: 52 },
  { name: 'Склады А1', physical: 100, financial: 98 },
  { name: 'Коттеджи', physical: 68, financial: 71 },
];

const budgetDistribution = [
  { name: 'Жилые', value: 5200, color: '#4F46E5' },
  { name: 'Коммерческие', value: 3800, color: '#10B981' },
  { name: 'Инфраструктура', value: 2100, color: '#F59E0B' },
  { name: 'Логистика', value: 1900, color: '#EF4444' },
  { name: 'Офисы', value: 2600, color: '#8B5CF6' }
];

const riskProjects = [
  { 
    id: 1, 
    name: 'ЖК Гранд-Парк',
    risk: 'high',
    budget: 850,
    progress: 45,
    deadline: '15.09.2024',
    issues: ['Просрочка поставок', 'Превышение бюджета']
  },
  { 
    id: 2, 
    name: 'Бизнес-Центр Альфа',
    risk: 'medium',
    budget: 1200,
    progress: 78,
    deadline: '20.11.2024',
    issues: ['Изменения в проекте']
  },
  { 
    id: 3, 
    name: 'Складской комплекс Б2',
    risk: 'low',
    budget: 650,
    progress: 92,
    deadline: '05.10.2024',
    issues: []
  }
];

const projects = [
  {
    id: 1,
    name: 'ЖК Солнечный',
    type: 'Жилой комплекс',
    status: 'В работе',
    progress: 68,
    budget: 1250,
    spent: 850,
    deadline: '2024-12-15',
    manager: 'Иванов И.И.',
    risk: 'low'
  },
  {
    id: 2,
    name: 'Офис-Центр Динамо',
    type: 'Коммерческая недвижимость',
    status: 'В работе',
    progress: 45,
    budget: 890,
    spent: 401,
    deadline: '2025-03-20',
    manager: 'Петрова А.С.',
    risk: 'medium'
  },
  {
    id: 3,
    name: 'ТРЦ Европа',
    type: 'Торговый центр',
    status: 'Планирование',
    progress: 15,
    budget: 2100,
    spent: 315,
    deadline: '2025-08-10',
    manager: 'Сидоров В.П.',
    risk: 'high'
  }
];

function Index() {
  const [activeTab, setActiveTab] = useState('overview');

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Icon name="BarChart3" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Портфель проектного финансирования</h1>
                <p className="text-sm text-gray-600">Аналитика строительных проектов</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-green-700 bg-green-50">
                <Icon name="TrendingUp" size={16} className="mr-1" />
                ROI +18.5%
              </Badge>
              <div className="text-right">
                <p className="text-sm text-gray-600">Последнее обновление</p>
                <p className="text-xs text-gray-500">19 августа, 14:30</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Портфель проектов</p>
                  <p className="text-3xl font-bold">{kpiData.totalPortfolio.toLocaleString()} млн ₽</p>
                  <p className="text-blue-100 text-sm">Общая стоимость</p>
                </div>
                <Icon name="Building2" size={48} className="text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Активных проектов</p>
                  <p className="text-3xl font-bold">{kpiData.activeProjects}</p>
                  <p className="text-green-100 text-sm">+{kpiData.completedProjects} завершено</p>
                </div>
                <Icon name="Activity" size={48} className="text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Использовано бюджета</p>
                  <p className="text-3xl font-bold">{kpiData.usedBudget} млрд ₽</p>
                  <p className="text-purple-100 text-sm">из {kpiData.totalBudget} млрд ₽</p>
                </div>
                <Icon name="DollarSign" size={48} className="text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100 text-sm font-medium">Проекты с рисками</p>
                  <p className="text-3xl font-bold">{kpiData.riskProjects}</p>
                  <p className="text-red-100 text-sm">Требуют внимания</p>
                </div>
                <Icon name="AlertTriangle" size={48} className="text-red-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white p-1 rounded-lg shadow-sm">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <Icon name="LayoutDashboard" size={20} className="mr-2" />
              Обзор
            </TabsTrigger>
            <TabsTrigger value="projects" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <Icon name="Building" size={20} className="mr-2" />
              Проекты
            </TabsTrigger>
            <TabsTrigger value="finance" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <Icon name="Wallet" size={20} className="mr-2" />
              Финансы
            </TabsTrigger>
            <TabsTrigger value="risks" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <Icon name="Shield" size={20} className="mr-2" />
              Риски
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <Icon name="TrendingUp" size={20} className="mr-2" />
              Аналитика
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Financial Chart */}
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="TrendingUp" size={20} className="mr-2 text-info" />
                    Финансовая динамика
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={financialData}>
                        <defs>
                          <linearGradient id="colorPlanned" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.1}/>
                          </linearGradient>
                          <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip formatter={(value) => [`${value} млн ₽`, '']} />
                        <Legend />
                        <Area 
                          type="monotone" 
                          dataKey="planned" 
                          stroke="#4F46E5" 
                          fillOpacity={1} 
                          fill="url(#colorPlanned)" 
                          name="Планируется"
                        />
                        <Area 
                          type="monotone" 
                          dataKey="actual" 
                          stroke="#10B981" 
                          fillOpacity={1} 
                          fill="url(#colorActual)" 
                          name="Фактически"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Physical Progress Chart */}
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="Activity" size={20} className="mr-2 text-success" />
                    Физический прогресс
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={progressData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip formatter={(value) => [`${value}%`, '']} />
                        <Legend />
                        <Bar dataKey="physical" fill="#10B981" name="Физический" />
                        <Bar dataKey="financial" fill="#4F46E5" name="Финансовый" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon name="Clock" size={20} className="mr-2" />
                  Последние события
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Проект "Складской комплекс Б2" завершен на 100%</p>
                    <p className="text-xs text-gray-500">2 часа назад</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Превышение бюджета в проекте "ЖК Гранд-Парк"</p>
                    <p className="text-xs text-gray-500">4 часа назад</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Новое финансирование одобрено: 850 млн ₽</p>
                    <p className="text-xs text-gray-500">Вчера</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="grid gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="bg-white hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                      <div className="lg:col-span-2">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                            <p className="text-sm text-gray-600">{project.type}</p>
                            <p className="text-xs text-gray-500 mt-1">Менеджер: {project.manager}</p>
                          </div>
                          <Badge className={getRiskBadgeColor(project.risk)}>
                            {project.risk === 'high' && 'Высокий риск'}
                            {project.risk === 'medium' && 'Средний риск'}
                            {project.risk === 'low' && 'Низкий риск'}
                          </Badge>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Прогресс выполнения</span>
                              <span>{project.progress}%</span>
                            </div>
                            <Progress value={project.progress} className="h-2" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-600">Бюджет</p>
                          <p className="text-lg font-semibold">{project.budget} млн ₽</p>
                          <p className="text-xs text-gray-500">Использовано: {project.spent} млн ₽</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Дедлайн</p>
                          <p className="text-sm font-medium">{new Date(project.deadline).toLocaleDateString('ru-RU')}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col justify-between">
                        <Badge variant="outline" className={`mb-2 ${project.status === 'В работе' ? 'border-green-200 text-green-700' : 'border-yellow-200 text-yellow-700'}`}>
                          {project.status}
                        </Badge>
                        <div className="space-y-2">
                          <button className="w-full text-xs bg-blue-500 text-white py-1.5 px-3 rounded hover:bg-blue-600 transition-colors">
                            Подробнее
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Finance Tab */}
          <TabsContent value="finance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Распределение бюджетов</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={budgetDistribution}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}M ₽`}
                        >
                          {budgetDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value} млн ₽`, 'Бюджет']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Денежные потоки</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={financialData}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip formatter={(value) => [`${value} млн ₽`, '']} />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="cumulative" 
                          stroke="#7C3AED" 
                          strokeWidth={3}
                          name="Накопительно"
                          dot={{ fill: '#7C3AED', strokeWidth: 2, r: 5 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="actual" 
                          stroke="#10B981" 
                          strokeWidth={2}
                          name="Месячный расход"
                          dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Финансовые показатели</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Icon name="TrendingUp" size={32} className="mx-auto text-blue-600 mb-2" />
                    <p className="text-2xl font-bold text-blue-600">+{kpiData.averageMargin}%</p>
                    <p className="text-sm text-gray-600">Средняя маржинальность</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Icon name="Clock" size={32} className="mx-auto text-green-600 mb-2" />
                    <p className="text-2xl font-bold text-green-600">{kpiData.onTimeDelivery}%</p>
                    <p className="text-sm text-gray-600">Проекты в срок</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Icon name="DollarSign" size={32} className="mx-auto text-purple-600 mb-2" />
                    <p className="text-2xl font-bold text-purple-600">62%</p>
                    <p className="text-sm text-gray-600">Использование бюджета</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Risks Tab */}
          <TabsContent value="risks" className="space-y-6">
            <div className="grid gap-4">
              {riskProjects.map((project) => (
                <Card key={project.id} className={`border-l-4 ${getRiskColor(project.risk)}`}>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
                      <div className="lg:col-span-2">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.name}</h3>
                        <div className="flex items-center space-x-4">
                          <Badge className={getRiskBadgeColor(project.risk)}>
                            {project.risk === 'high' && 'Критический'}
                            {project.risk === 'medium' && 'Умеренный'}
                            {project.risk === 'low' && 'Низкий'}
                          </Badge>
                          <span className="text-sm text-gray-600">Прогресс: {project.progress}%</span>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Бюджет</p>
                        <p className="text-lg font-semibold">{project.budget} млн ₽</p>
                        <p className="text-xs text-gray-500">До {project.deadline}</p>
                      </div>
                      
                      <div>
                        {project.issues.length > 0 ? (
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-700">Проблемы:</p>
                            {project.issues.map((issue, index) => (
                              <p key={index} className="text-xs text-red-600">• {issue}</p>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-green-600">Нет активных рисков</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Эффективность по типам проектов</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={[
                        { type: 'Жилые', roi: 22, projects: 8 },
                        { type: 'Офисы', roi: 18, projects: 5 },
                        { type: 'ТРЦ', roi: 25, projects: 3 },
                        { type: 'Склады', roi: 15, projects: 4 },
                        { type: 'Отели', roi: 20, projects: 2 }
                      ]}>
                        <XAxis dataKey="type" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip formatter={(value, name) => [
                          name === 'roi' ? `${value}%` : value,
                          name === 'roi' ? 'ROI' : 'Количество проектов'
                        ]} />
                        <Bar dataKey="roi" fill="#4F46E5" name="ROI" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Прогноз завершения</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium">Q3 2024</span>
                      <span className="text-sm text-green-600">5 проектов</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium">Q4 2024</span>
                      <span className="text-sm text-blue-600">8 проектов</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                      <span className="text-sm font-medium">Q1 2025</span>
                      <span className="text-sm text-yellow-600">6 проектов</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="text-sm font-medium">Q2 2025+</span>
                      <span className="text-sm text-purple-600">5 проектов</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Ключевые метрики эффективности</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <Icon name="Target" size={32} className="mx-auto text-blue-600 mb-2" />
                    <p className="text-2xl font-bold">94%</p>
                    <p className="text-sm text-gray-600">Точность планирования</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Icon name="Users" size={32} className="mx-auto text-green-600 mb-2" />
                    <p className="text-2xl font-bold">127</p>
                    <p className="text-sm text-gray-600">Команда специалистов</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Icon name="Award" size={32} className="mx-auto text-purple-600 mb-2" />
                    <p className="text-2xl font-bold">4.8</p>
                    <p className="text-sm text-gray-600">Рейтинг качества</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Icon name="Zap" size={32} className="mx-auto text-yellow-600 mb-2" />
                    <p className="text-2xl font-bold">86%</p>
                    <p className="text-sm text-gray-600">Автоматизация процессов</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Index;