from typing import Dict, Any, List
from decimal import Decimal
import hashlib
import json
from datetime import datetime, date

class DataTransformer:
    """Transform sensitive data into privacy-preserving formats"""
    
    @staticmethod
    def transform_income(income: float) -> str:
        """Convert exact income to income range"""
        if income < 25000:
            return "below_25k"
        elif income < 50000:
            return "25k_50k"
        elif income < 75000:
            return "50k_75k"
        elif income < 100000:
            return "75k_100k"
        elif income < 150000:
            return "100k_150k"
        else:
            return "above_150k"
    
    @staticmethod
    def transform_employment(employment_data: Dict) -> Dict:
        """Transform employment details"""
        return {
            "employment_type": employment_data.get("type", "unknown"),
            "industry": DataTransformer._get_industry(employment_data.get("company", "")),
            "stability": "stable" if employment_data.get("years", 0) > 2 else "recent"
        }
    
    @staticmethod
    def _get_industry(company: str) -> str:
        """Map company to industry"""
        tech_companies = ["infosys", "tcs", "wipro", "tech mahindra"]
        company_lower = company.lower()
        
        for tech in tech_companies:
            if tech in company_lower:
                return "information_technology"
        return "other"
    
    @staticmethod
    def calculate_financial_score(transactions: List[Dict]) -> str:
        """Calculate financial stability score"""
        if not transactions:
            return "insufficient_data"
        
        total_credits = sum(t.get("amount", 0) for t in transactions if t.get("type") == "credit")
        total_debits = sum(t.get("amount", 0) for t in transactions if t.get("type") == "debit")
        
        if total_credits == 0:
            return "no_income"
        
        savings_ratio = (total_credits - total_debits) / total_credits
        
        if savings_ratio > 0.3:
            return "excellent"
        elif savings_ratio > 0.15:
            return "good"
        elif savings_ratio > 0:
            return "fair"
        else:
            return "poor"