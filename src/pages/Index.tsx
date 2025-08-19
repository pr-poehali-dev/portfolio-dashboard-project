import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const Index = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  // Mock data для демонстрации
  const kpiData = {
    totalValue: '2.8 млрд ₽',
    activeProjects: 12,
    completedProjects: 8,
    totalRisk: 'Средний',
    avgProgress: 68
  };

  // Data for charts
  const financialData = [
    { month: 'Янв', planned: 180, actual: 165, cumulative: 165 },
    { month: 'Фев', planned: 220, actual: 210, cumulative: 375 },
    { month: 'Мар', planned: 280, actual: 290, cumulative: 665 },
    { month: 'Апр', planned: 320, actual: 315, cumulative: 980 },
    { month: 'Май', planned: 180, actual: 175, cumulative: 1155 },
    { month: 'Июн', planned: 240, actual: 235, cumulative: 1390 }
  ];

  const progressData = [
    { name: 'ЖК "Северный"', physical: 68, financial: 73 },
    { name: 'БЦ "Прайм"', physical: 62, financial: 65 },
    { name: 'Логист. комплекс', physical: 89, financial: 84 }
  ];

  const budgetDistribution = [
    { name: 'ЖК "Северный"', value: 850, color: '#4F46E5' },
    { name: 'БЦ "Прайм"', value: 1200, color: '#7C3AED' },
    { name: 'Логист. комплекс', value: 450, color: '#06B6D4' },
    { name: 'Другие проекты', value: 300, color: '#10B981' }
  ];

  const riskData = [
    { month: 'Янв', low: 8, medium: 3, high: 1 },
    { month: 'Фев', low: 9, medium: 2, high: 1 },
    { month: 'Мар', low: 10, medium: 2, high: 0 },
    { month: 'Апр', low: 11, medium: 1, high: 0 },
    { month: 'Май', low: 11, medium: 1, high: 0 },
    { month: 'Июн', low: 11, medium: 1, high: 0 }
  ];

  const projects = [
    {
      id: 1,
      name: 'ЖК "Северный"',
      totalBudget: '850M ₽',
      spent: '620M ₽',
      progress: 73,
      physicalProgress: 68,
      risk: 'low',
      status: 'В работе',
      timeline: '2024-2026',
      location: 'Москва',
      contractor: 'СтройГрупп А1'
    },
    {
      id: 2,
      name: 'Бизнес-центр "Прайм"',
      totalBudget: '1.2B ₽',
      spent: '780M ₽',
      progress: 65,
      physicalProgress: 62,
      risk: 'medium',
      status: 'В работе',
      timeline: '2023-2025',
      location: 'СПб',
      contractor: 'МегаСтрой'
    },
    {
      id: 3,
      name: 'Логистический комплекс',
      totalBudget: '450M ₽',
      spent: '380M ₽',
      progress: 84,
      physicalProgress: 89,
      risk: 'low',
      status: 'Завершается',
      timeline: '2022-2024',
      location: 'Екатеринбург',
      contractor: 'ЛогиБилд'
    }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-success bg-green-50 border-green-200';
      case 'medium': return 'text-warning bg-amber-50 border-amber-200';
      case 'high': return 'text-danger bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRiskText = (risk: string) => {
    switch (risk) {
      case 'low': return 'Низкий';
      case 'medium': return 'Средний';
      case 'high': return 'Высокий';
      default: return 'Неизвестно';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Портфель Проектного Финансирования</h1>
            <p className="text-gray-600 mt-1">Аналитика строительных проектов</p>
          </div>
          <div className="flex gap-3">
            <button className="gradient-blue text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
              <Icon name="Download" size={16} className="inline mr-2" />
              Экспорт отчета
            </button>
            <button className="bg-white border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              <Icon name="Settings" size={16} className="inline mr-2" />
              Настройки
            </button>
          </div>
        </div>

        {/* KPI Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="bg-white hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <Icon name="DollarSign" size={16} className="mr-2 text-info" />
                Общая стоимость
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{kpiData.totalValue}</div>
              <p className="text-xs text-gray-500 mt-1">+12% за квартал</p>
            </CardContent>
          </Card>

          <Card className="bg-white hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <Icon name="Building2" size={16} className="mr-2 text-success" />
                Активных проектов
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{kpiData.activeProjects}</div>
              <p className="text-xs text-gray-500 mt-1">Из {kpiData.activeProjects + kpiData.completedProjects} всего</p>
            </CardContent>
          </Card>

          <Card className="bg-white hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <Icon name="CheckCircle" size={16} className="mr-2 text-success" />
                Завершено
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{kpiData.completedProjects}</div>
              <p className="text-xs text-success mt-1">100% успешно</p>
            </CardContent>
          </Card>

          <Card className="bg-white hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <Icon name="AlertTriangle" size={16} className="mr-2 text-warning" />
                Уровень рисков
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{kpiData.totalRisk}</div>
              <p className="text-xs text-warning mt-1">Требует внимания</p>
            </CardContent>
          </Card>

          <Card className="bg-white hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <Icon name="TrendingUp" size={16} className="mr-2 text-info" />
                Средний прогресс
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{kpiData.avgProgress}%</div>
              <Progress value={kpiData.avgProgress} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white p-1 h-auto">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Icon name="BarChart3" size={16} />
              Обзор
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <Icon name="Building" size={16} />
              Проекты
            </TabsTrigger>
            <TabsTrigger value="finance" className="flex items-center gap-2">
              <Icon name="PieChart" size={16} />
              Финансы
            </TabsTrigger>
            <TabsTrigger value="risks" className="flex items-center gap-2">
              <Icon name="ShieldAlert" size={16} />
              Риски
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <Icon name="LineChart" size={16} />
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

            {/* Projects Quick View */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon name="Building2" size={20} className="mr-2 text-purple-600" />
                  Активные проекты
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:shadow-sm transition-shadow">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 gradient-blue rounded-lg flex items-center justify-center">
                          <Icon name="Building" size={20} className="text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{project.name}</h3>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-sm text-gray-500">{project.location}</span>
                            <Badge className={getRiskColor(project.risk)}>
                              {getRiskText(project.risk)} риск
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">{project.spent} / {project.totalBudget}</div>
                          <div className="text-xs text-gray-500">Потрачено</div>
                        </div>
                        <div className="w-24">
                          <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                            <span>Прогресс</span>
                            <span>{project.physicalProgress}%</span>
                          </div>
                          <Progress value={project.physicalProgress} className="h-2" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="bg-white hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                        <p className="text-sm text-gray-500 mt-1">{project.location} • {project.timeline}</p>
                      </div>
                      <Badge className={getRiskColor(project.risk)} variant="outline">
                        {getRiskText(project.risk)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Физический прогресс</span>
                        <span className="text-sm font-medium">{project.physicalProgress}%</span>
                      </div>
                      <Progress value={project.physicalProgress} className="h-2" />
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Финансовый прогресс</span>
                        <span className="text-sm font-medium">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>

                    <div className="pt-2 border-t border-gray-100">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Бюджет</span>
                        <span className="text-sm font-medium">{project.totalBudget}</span>
                      </div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm text-gray-600">Потрачено</span>
                        <span className="text-sm font-medium text-blue-600">{project.spent}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        Подрядчик: {project.contractor}
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
          </TabsContent>

          {/* Risks Tab */}
          <TabsContent value="risks" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-red-600">Карта рисков</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center">
                        <Icon name="AlertTriangle" size={16} className="mr-2 text-red-500" />
                        <span className="text-sm font-medium">Высокий риск</span>
                      </div>
                      <Badge className="bg-red-100 text-red-800">0 проектов</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <div className="flex items-center">
                        <Icon name="AlertCircle" size={16} className="mr-2 text-amber-500" />
                        <span className="text-sm font-medium">Средний риск</span>
                      </div>
                      <Badge className="bg-amber-100 text-amber-800">1 проект</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center">
                        <Icon name="CheckCircle" size={16} className="mr-2 text-green-500" />
                        <span className="text-sm font-medium">Низкий риск</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">11 проектов</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Мониторинг рисков</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg flex items-center justify-center border border-orange-100">
                    <div className="text-center">
                      <Icon name="Shield" size={48} className="mx-auto text-orange-400 mb-2" />
                      <p className="text-gray-600">Система мониторинга</p>
                      <p className="text-sm text-gray-500 mt-1">Автоматические уведомления</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Прогнозирование</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg flex items-center justify-center border border-purple-100">
                    <div className="text-center">
                      <Icon name="TrendingUp" size={48} className="mx-auto text-purple-400 mb-2" />
                      <p className="text-gray-600">ИИ-прогнозы</p>
                      <p className="text-sm text-gray-500 mt-1">Завершение проектов</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Эффективность</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg flex items-center justify-center border border-cyan-100">
                    <div className="text-center">
                      <Icon name="BarChart3" size={48} className="mx-auto text-cyan-400 mb-2" />
                      <p className="text-gray-600">Анализ эффективности</p>
                      <p className="text-sm text-gray-500 mt-1">ROI и KPI показатели</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

        </Tabs>

      </div>
    </div>
  );
};

export default Index;