import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { AlertCircle, Sparkles } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import QuestionCard from '@/components/quiz/QuestionCard';
import ResultCard from '@/components/quiz/ResultCard';

const questions = [
  {
    id: 1,
    text: 'لديك وقت فراغ، ماذا تفعل؟',
    options: [
      { value: 'A', text: 'أخرج مع أصدقائي' },
      { value: 'B', text: 'أشاهد مسلسلات أو أتصفح الهاتف' },
      { value: 'C', text: 'أعمل على هواية أو مشروع' },
      { value: 'D', text: 'أرتاح أو أنام' }
    ]
  },
  {
    id: 2,
    text: 'في العمل الجماعي، أنت غالبًا:',
    options: [
      { value: 'A', text: 'القائد' },
      { value: 'B', text: 'تشارك الأفكار وتساعد الجميع' },
      { value: 'C', text: 'تعمل بهدوء وتنجز مهمتك' },
      { value: 'D', text: 'تنتظر التوجيهات' }
    ]
  },
  {
    id: 3,
    text: 'كيف تتخذ قراراتك؟',
    options: [
      { value: 'A', text: 'بسرعة وثقة' },
      { value: 'B', text: 'بعد مناقشتها مع الآخرين' },
      { value: 'C', text: 'بالتفكير العميق' },
      { value: 'D', text: 'أختار الأسهل' }
    ]
  },
  {
    id: 4,
    text: 'أي وصف يناسبك أكثر؟',
    options: [
      { value: 'A', text: 'نشيط واجتماعي' },
      { value: 'B', text: 'ودود ومتعاون' },
      { value: 'C', text: 'هادئ ومفكر' },
      { value: 'D', text: 'بسيط ومرن' }
    ]
  },
  {
    id: 5,
    text: 'إذا تغيرت الخطط فجأة، ماذا تفعل؟',
    options: [
      { value: 'A', text: 'أتأقلم بسرعة' },
      { value: 'B', text: 'أشعر بالتوتر قليلاً ثم أتأقلم' },
      { value: 'C', text: 'أفضل الالتزام بالخطة الأصلية' },
      { value: 'D', text: 'لا يهمني كثيرًا' }
    ]
  },
  {
    id: 6,
    text: 'ما الذي يحفزك أكثر؟',
    options: [
      { value: 'A', text: 'تحقيق الإنجازات' },
      { value: 'B', text: 'إسعاد الآخرين' },
      { value: 'C', text: 'التعلم واكتساب المعرفة' },
      { value: 'D', text: 'الراحة والهدوء' }
    ]
  },
  {
    id: 7,
    text: 'كيف تتعامل مع الضغط؟',
    options: [
      { value: 'A', text: 'أستمر بالعمل وأتجاوز الأمر' },
      { value: 'B', text: 'أتحدث مع شخص مقرّب' },
      { value: 'C', text: 'أنعزل وأفكر' },
      { value: 'D', text: 'أشتت نفسي بشيء آخر' }
    ]
  },
  {
    id: 8,
    text: 'كيف يصفك أصدقاؤك؟',
    options: [
      { value: 'A', text: 'واثق' },
      { value: 'B', text: 'طيب القلب' },
      { value: 'C', text: 'ذكي' },
      { value: 'D', text: 'هادئ' }
    ]
  },
  {
    id: 9,
    text: 'عند مقابلة أشخاص جدد، أنت:',
    options: [
      { value: 'A', text: 'تبدأ الحديث' },
      { value: 'B', text: 'تشارك بلطف' },
      { value: 'C', text: 'تراقب أولاً' },
      { value: 'D', text: 'تنتظر أن يبدؤوا الحديث' }
    ]
  },
  {
    id: 10,
    text: 'أي جملة تشبهك أكثر؟',
    options: [
      { value: 'A', text: 'أحب القيادة' },
      { value: 'B', text: 'العلاقات مهمة بالنسبة لي' },
      { value: 'C', text: 'أحب الاستقلالية' },
      { value: 'D', text: 'أحب السير مع الأمور كما هي' }
    ]
  }
];

export default function Quiz() {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [unansweredQuestions, setUnansweredQuestions] = useState([]);

  const handleAnswerSelect = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
    setShowAlert(false);
  };

  const calculateResult = () => {
    const unanswered = questions.filter(q => !answers[q.id]).map(q => q.id);
    
    if (unanswered.length > 0) {
      setUnansweredQuestions(unanswered);
      setShowAlert(true);
      // Scroll to first unanswered question
      const firstUnanswered = document.getElementById(`question-${unanswered[0]}`);
      if (firstUnanswered) {
        firstUnanswered.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    const counts = { A: 0, B: 0, C: 0, D: 0 };
    Object.values(answers).forEach(answer => {
      counts[answer]++;
    });

    const maxCount = Math.max(...Object.values(counts));
    const personality = Object.keys(counts).find(key => counts[key] === maxCount);
    setResult(personality);
  };

  const handleRetake = () => {
    setAnswers({});
    setResult(null);
    setShowAlert(false);
    setUnansweredQuestions([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/30 to-indigo-50/50" dir="rtl">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">اختبار الشخصية</h1>
                <p className="text-sm text-slate-500">اكتشف نوع شخصيتك</p>
              </div>
            </div>
            <span className="text-sm font-medium text-slate-500">
              {answeredCount} / {questions.length}
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {result ? (
            <ResultCard result={result} onRetake={handleRetake} />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Alert */}
              <AnimatePresence>
                {showAlert && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mb-6"
                  >
                    <Alert variant="destructive" className="bg-red-50 border-red-200 rounded-2xl">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                      <AlertDescription className="text-red-700 font-medium">
                        يرجى الإجابة على جميع الأسئلة. الأسئلة غير المجابة: {unansweredQuestions.join('، ')}
                      </AlertDescription>
                    </Alert>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Questions */}
              <div className="space-y-6">
                {questions.map((question, index) => (
                  <div 
                    key={question.id} 
                    id={`question-${question.id}`}
                    className={unansweredQuestions.includes(question.id) ? 'ring-2 ring-red-300 rounded-3xl' : ''}
                  >
                    <QuestionCard
                      question={question}
                      questionNumber={index + 1}
                      selectedAnswer={answers[question.id]}
                      onAnswerSelect={handleAnswerSelect}
                    />
                  </div>
                ))}
              </div>

              {/* Submit Button */}
              <motion.div 
                className="mt-10 flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  onClick={calculateResult}
                  size="lg"
                  className="px-12 py-6 text-lg font-bold rounded-full bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/30 transition-all duration-300"
                >
                  <Sparkles className="w-5 h-5 ml-2" />
                  عرض النتيجة
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
import React from 'react';

const UserNotRegisteredError = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg border border-slate-100">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-orange-100">
            <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Access Restricted</h1>
          <p className="text-slate-600 mb-8">
            You are not registered to use this application. Please contact the app administrator to request access.
          </p>
          <div className="p-4 bg-slate-50 rounded-md text-sm text-slate-600">
            <p>If you believe this is an error, you can:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Verify you are logged in with the correct account</li>
              <li>Contact the app administrator for access</li>
              <li>Try logging out and back in again</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNotRegisteredError;

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const optionLabels = {
  A: 'أ',
  B: 'ب',
  C: 'ج',
  D: 'د'
};

export default function QuestionCard({ question, questionNumber, selectedAnswer, onAnswerSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: questionNumber * 0.05 }}
      className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex items-start gap-4 mb-6">
        <span className="flex-shrink-0 w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white flex items-center justify-center font-bold text-lg">
          {questionNumber}
        </span>
        <h3 className="text-lg md:text-xl font-semibold text-slate-800 leading-relaxed pt-1">
          {question.text}
        </h3>
      </div>

      <div className="grid gap-3 mr-14">
        {question.options.map((option) => (
          <motion.button
            key={option.value}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => onAnswerSelect(question.id, option.value)}
            className={cn(
              "w-full text-right p-4 rounded-2xl border-2 transition-all duration-200 flex items-center gap-3",
              selectedAnswer === option.value
                ? "border-violet-500 bg-violet-50 text-violet-700"
                : "border-slate-200 hover:border-violet-300 hover:bg-slate-50 text-slate-700"
            )}
          >
            <span className={cn(
              "w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 transition-colors",
              selectedAnswer === option.value
                ? "bg-violet-500 text-white"
                : "bg-slate-100 text-slate-500"
            )}>
              {optionLabels[option.value]}
            </span>
            <span className="font-medium">{option.text}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Heart, Brain, Coffee, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const personalityTypes = {
  A: {
    title: 'القائد',
    description: 'شخصية واثقة، طموحة، ومليئة بالطاقة. تحب أن تكون في المقدمة وتقود الآخرين نحو النجاح.',
    icon: Crown,
    gradient: 'from-amber-400 to-orange-500',
    bgGradient: 'from-amber-50 to-orange-50',
    traits: ['الثقة بالنفس', 'الطموح', 'القيادة', 'الحسم']
  },
  B: {
    title: 'الاجتماعي',
    description: 'ودود، متعاون، ويهتم بالآخرين. تبني علاقات قوية وتسعد من حولك.',
    icon: Heart,
    gradient: 'from-pink-400 to-rose-500',
    bgGradient: 'from-pink-50 to-rose-50',
    traits: ['الود', 'التعاون', 'الاهتمام', 'اللطف']
  },
  C: {
    title: 'المفكر',
    description: 'هادئ، مستقل، وعميق التفكير. تحب التأمل والتعلم واكتشاف الأشياء بعمق.',
    icon: Brain,
    gradient: 'from-violet-400 to-purple-500',
    bgGradient: 'from-violet-50 to-purple-50',
    traits: ['الذكاء', 'الاستقلالية', 'العمق', 'التحليل']
  },
  D: {
    title: 'الهادئ',
    description: 'مرن، بسيط، ويحب الراحة. تتعامل مع الحياة بسلاسة وبدون تعقيد.',
    icon: Coffee,
    gradient: 'from-teal-400 to-emerald-500',
    bgGradient: 'from-teal-50 to-emerald-50',
    traits: ['المرونة', 'البساطة', 'الهدوء', 'السلام']
  }
};

export default function ResultCard({ result, onRetake }) {
  const personality = personalityTypes[result];
  const Icon = personality.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: 'spring' }}
      className="max-w-2xl mx-auto"
    >
      <div className={`bg-gradient-to-br ${personality.bgGradient} rounded-3xl p-8 md:p-12 border border-white/50 shadow-xl`}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="flex justify-center mb-8"
        >
          <div className={`w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-gradient-to-br ${personality.gradient} flex items-center justify-center shadow-lg`}>
            <Icon className="w-12 h-12 md:w-16 md:h-16 text-white" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <p className="text-slate-500 font-medium mb-2">نوع شخصيتك</p>
          <h2 className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${personality.gradient} bg-clip-text text-transparent mb-4`}>
            {personality.title}
          </h2>
          <p className="text-slate-600 text-lg md:text-xl leading-relaxed mb-8">
            {personality.description}
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {personality.traits.map((trait, index) => (
              <motion.span
                key={trait}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className={`px-4 py-2 rounded-full bg-gradient-to-r ${personality.gradient} text-white font-medium text-sm shadow-md`}
              >
                {trait}
              </motion.span>
            ))}
          </div>

          <Button
            onClick={onRetake}
            variant="outline"
            size="lg"
            className="rounded-full px-8 gap-2 border-2 hover:bg-white/50"
          >
            <RotateCcw className="w-5 h-5" />
            إعادة الاختبار
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}